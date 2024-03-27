import { PrismaClient } from '@prisma/client';
import { STATUS_CODES } from '../../utils/statusCodes/statusCode.js';

const prisma = new PrismaClient();

const paginationDefault = {
  amount: 10,
  page: 1,
};

const getDevice = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

    const deviceID = req.params.dev_eui;

    const queryDevice = {
      where: { dev_eui: String(deviceID) },
    };

    const amount = req.query.amount || paginationDefault.amount;
    const page = req.query.page || paginationDefault.page;

    if (req.query.payload === 'true') {
      queryDevice.include = {
        payloads: {
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

    const hasNextPage = device.payloads.length === Number(amount);

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: device,
      nextPage: hasNextPage ? Number(page) + 1 : undefined,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.status,
      msg: error.message,
    });
  }
};

export default getDevice;
