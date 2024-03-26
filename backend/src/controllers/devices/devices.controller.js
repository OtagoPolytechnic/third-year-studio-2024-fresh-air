import { PrismaClient } from '@prisma/client';
import { STATUS_CODES } from '../../utils/statusCodes/statusCode.js';

const prisma = new PrismaClient();

const getDevice = async (req, res) => {
  try {
    const deviceID = req.params.dev_eui;

    const device = await prisma.device.findFirst({
      where: { dev_eui: String(deviceID) },
      include: {
        payloads: true,
      },
    });

    if (!device || device.length === 0) {
      return res.status(STATUS_CODES.ERROR).json({
        statusCode: res.statusCode,
        message: 'No payload found for the device',
      });
    }

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: device,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getDevice;
