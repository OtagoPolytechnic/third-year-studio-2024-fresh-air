import { STATUS_CODES } from '../../utils/statusCodes/statusCode.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// webhook will get the payload from the co2 sensors and return the data along with the statuscode and message
export const handleWebhook = async (req, res) => {
  try {
    const payload = req.body;
    // Remove later
    console.log(payload);

    if (!payload || Object.keys(payload).length === 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.statusCode,
        message: 'Empty payload received',
      });
    }

    // Call the db and check if the device already exists
    const checkDeviceId = await prisma.device.findUnique({
      where: { deviceId: payload.end_device_ids.device_id },
    });

    // If the device does not exist, creates it
    if (!checkDeviceId) {
      await prisma.device.create({
        data: {
          deviceId: payload.end_device_ids.device_id,
          dev_eui: payload.end_device_ids.dev_eui,
        },
      });
    }

    // Grab the receivedString containing co2 and temp and split to get the values
    const receivedStringValues = payload.uplink_message.decoded_payload.receivedString;
    const [value1, value2] = receivedStringValues.split(':').map((value) => value.replace(/\\x[0-9A-Fa-f]{2}/g, ''));

    const payloadData = await prisma.payload.create({
      data: {
        deviceId: payload.end_device_ids.device_id,
        co2: value1,
        temperature: value2,
      },
    });

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      message: 'Payload received, data added to the database',
      data: payloadData,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: 'Internal server error occurred while processing the webhook request',
    });
  }
};
