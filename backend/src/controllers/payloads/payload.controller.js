import { PrismaClient } from '@prisma/client';
import { STATUS_CODES } from '../../utils/statusCodes/statusCode.js';

const prisma = new PrismaClient();

const getAllPayloadDeviceData = async (req, res) => {
  try {
    const deviceID = req.params.dev_eui;

    const allData = await prisma.payload.findMany({
      where: { dev_eui: String(deviceID) },
      orderBy: { createdAt: 'desc' },
    });

    if (!allData || allData.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: 'No payload data available',
      });
    }

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: allData,
    });
  } catch (error) {
    console.error(error);
  }
};

// Get latest payload insert from room
const getRecentPayload = async (req, res) => {
  try {
    // Get the deviceID from the url params
    const deviceID = req.params.dev_eui;

    // find the first payload data, sorted by creation date, descending order
    const latestPayload = await prisma.payload.findFirst({
      where: { dev_eui: String(deviceID) },
      orderBy: { createdAt: 'desc' },
    });

    // If there is no payload return nothing found
    if (!latestPayload || latestPayload.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: 'No payload found for the device',
      });
    }

    // Return the payload data
    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: latestPayload,
    });
  } catch (error) {
    console.log(error);
  }
};

export { getRecentPayload, getAllPayloadDeviceData };
