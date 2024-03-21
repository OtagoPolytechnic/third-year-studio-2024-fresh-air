import { STATUS_CODES } from "../../utils/statusCodes/statusCode.js";

// webhook will get the payload from the co2 sensors and return the data along with the statuscode and message
export const handleWebhook = async (req, res) => {
	try {
		const payload = req.body;

		// Remove later
		console.log(payload);

		if (!payload || Object.keys(payload).length === 0) {
			return res.status(STATUS_CODES.BAD_REQUEST).json({
				statusCode: res.statusCode,
				message: "Empty payload received",
			});
		};

		return res.status(STATUS_CODES.OK).json({
			statusCode: res.statusCode,
			message: "Payload received",
			data: payload,
		});
	} catch (error) {
		return res.status(STATUS_CODES.SERVER_ERROR).json({
			statusCode: res.statusCode,
			message: "Internal server error occurred while processing the webhook request",
		});
	}
};