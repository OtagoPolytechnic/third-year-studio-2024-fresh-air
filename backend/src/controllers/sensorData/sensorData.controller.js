import { PrismaClient } from '@prisma/client';
import { STATUS_CODES } from '../../utils/statusCodes/statusCode.js';

const prisma = new PrismaClient();

const getAllSensorDeviceData = async (req, res) => {
  try {
    const dev_eui = req.params.dev_eui;

    const allSensorData = await prisma.sensorData.findMany({
      where: { dev_eui: String(dev_eui) },
      orderBy: { createdAt: 'desc' },
    });

    if (!allSensorData || allSensorData.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: 'No payload data available',
      });
    }

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: allSensorData,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: error.message,
    });
  }
};

// Get latest payload insert from room
const getRecentSensorData = async (req, res) => {
  try {
    // Get the dev_eui from the url params
    const dev_eui = req.params.dev_eui;

    // find the first payload data, sorted by creation date, descending order
    const recentSensorData = await prisma.sensorData.findFirst({
      where: { dev_eui: String(dev_eui) },
      include: {
        device: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // If there is no payload return nothing found
    if (!recentSensorData || recentSensorData.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: 'No payload found for the device',
      });
    }

    // Return the payload data
    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: recentSensorData,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: error.message,
    });
  }
};

export { getRecentSensorData, getAllSensorDeviceData };
