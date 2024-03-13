import { STATUS_CODES } from "../../src/utils/statusCodes/statusCode";

export const handleWebhook = async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload);

        return res.status(STATUS_CODES.OK).json({
            statusCode: res.statusCode,
            message: "Payload received",
            data: payload,
        });
    } catch (error) {
        return res.status(STATUS_CODES.SERVER_ERROR).json({
            statusCode: res.statusCode,
            message: "Internal server error occurred while processing the webhook request",
        })
    }
}