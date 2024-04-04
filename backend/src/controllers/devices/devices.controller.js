import { PrismaClient } from '@prisma/client';
import { STATUS_CODES } from '../../utils/statusCodes/statusCode.js';
import { PAGINATION_DEFAULTS } from '../../utils/constants/globalConstants.js';

const prisma = new PrismaClient();

const getDevice = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

    const dev_eui = req.params.dev_eui;

    const amount = req.query.amount || PAGINATION_DEFAULTS.amount;
    const page = req.query.page || PAGINATION_DEFAULTS.page;

    // pagination is a let for getDevice, cannot be const when payload is not passed through params
    let hasNextPage;

    const queryDevice = {
      where: { dev_eui: String(dev_eui) },
    };

    // if user wants to view payload data, will allow payload data from device to be sorted/paginated
    if (req.query.sensorData === 'true') {
      queryDevice.include = {
        sensorData: {
          orderBy: {
            [sortBy]: sortOrder,
          },
          take: Number(amount),
          skip: Number(page - 1) * Number(amount),
        },
      };
    }

    const device = await prisma.device.findFirst(queryDevice);

    if (!device || device.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: `Device ${deviceID} not found on the server`,
      });
    }

    // If payload is not passed through, using const for nextPage will error out as device.payloads does not exist
    if (req.query.sensorData) {
      hasNextPage = device.sensorData.length === Number(amount);
    }

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: device,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.status,
      message: error.message,
    });
  }
};

const getAllDevices = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';

    const amount = req.query.amount || PAGINATION_DEFAULTS.amount;
    const page = req.query.page || PAGINATION_DEFAULTS.page;

    const devices = await prisma.device.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
      take: Number(amount),
      skip: Number(page - 1) * Number(amount),
    });

    if (!devices || devices.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: `No devices found on the server`,
      });
    }

    const hasNextPage = devices.length === Number(amount);

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: devices,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.status,
      message: error.message,
    });
  }
};

export { getDevice, getAllDevices };