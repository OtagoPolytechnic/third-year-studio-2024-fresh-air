import { PrismaClient } from '@prisma/client';
import { STATUS_CODES } from '../../utils/statusCodes/statusCode.js';

const prisma = new PrismaClient();

// Get latest payload insert from room
const getRecentPayload = async (req, res) => {
  try {
    // Get the deviceID from the url params
    const deviceID = req.params.dev_eui;

    // find the first payload data, sorted by creation date, descending order
    const latestPayload = await prisma.payload.findFirst({
      where: { dev_eui: String(deviceID) },
      orderBy: {createdAt: 'desc' },
    });

    // If there is no payload return nothing found
    if (!latestPayload || latestPayload.length === 0) {
      return res.status(STATUS_CODES.ERROR).json({ 
        statusCode: res.statusCode,
        message: "No payload found for the device" });
  }; 

  // Return the payload data
    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: latestPayload,
    });
  } catch (error) {
    console.log(error);
  }
};



export default getRecentPayload;
