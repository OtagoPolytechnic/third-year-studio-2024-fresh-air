import { PrismaClient } from "@prisma/client";
import { STATUS_CODES } from "../../utils/statusCodes/statusCode.js";
// import { PAGINATION_DEFAULTS } from "../../utils/constants/globalConstants";

const prisma = new PrismaClient();

const createBlock = async (req, res) => {
    try {
        return res.json({
            msg: "hello"
        });

    } catch {
        return res.status(STATUS_CODES.SERVER_ERROR).json({
            statusCode: res.status,
            message: error.message
        });
    };
}

export { createBlock };