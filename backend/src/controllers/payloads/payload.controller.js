import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPayload = async (req, res) => {
    try {
        const getPayload = await prisma.payload.findFirst({
            where: { deviceId: String(req.params.id)}
        });

        return res.status(200).json({
            statusCode: res.statusCode,
            getPayload
        })
    } catch (error) {
        console.log(error)
    }
}

export default getPayload;