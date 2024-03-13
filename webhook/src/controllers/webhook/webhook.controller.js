import { STATUS_CODES } from "../../utils/statusCodes/statusCode.js";

// webhook will get the payload from the co2 sensors and return the data along with the statuscode and message
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
			message:
				"Internal server error occurred while processing the webhook request",
		});
	}
};
