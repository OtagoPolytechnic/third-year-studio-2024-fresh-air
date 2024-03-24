import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getPayload = async (req, res) => {
  try {
    const getPayload = await prisma.payload.findFirst({
      where: { dev_eui: String(req.params.dev_eui) },
    });

    return res.status(200).json({
      statusCode: res.statusCode,
      data: getPayload,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getPayload;
