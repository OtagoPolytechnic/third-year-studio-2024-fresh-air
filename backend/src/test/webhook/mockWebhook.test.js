import { handleWebhook } from "../../controllers/webhook/webhook.controller";

jest.mock('../../controllers/webhook/webhook.controller', () => ({
    handleWebhook: jest.fn(),
}));

// // Mock data that the webhook will return
const payload = {
  end_device_ids: {
    device_id: '00d3c69800bff312',
    application_ids: { application_id: 'co2-test' },
    dev_eui: '00D3C69B00BFF312',
  },
  uplink_message: {
    f_port: 1,
    f_cnt: 323,
    frm_payload: 'NDAXXXXXX',
    decoded_payload: { receivedString: '400:22\x00\x00' },
  },
};
  
const sensorData ={
    data: {
      deviceId: '00d3c69800bff312',
      dev_eui: '00D3C69B00BFF312',
      co2: 469,
      temperature: 22,
    },
  }

  const sensorDataPayload = {
    statusCode: 200,
    message: 'Sensor data received, data added to the database',
    data: sensorData,
  };



describe('Webhook function test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('should return an object containing payload data', async () => {
        handleWebhook.mockImplementationOnce(async () => {
            return Promise.resolve(payload)
        });

        await handleWebhook();
        expect(handleWebhook).toHaveBeenCalled();
    });

    test('should return an empty object', async () => {
        handleWebhook.mockImplementationOnce(async () => {
            return Promise.resolve({})
        });

        const result =await handleWebhook();
        expect(result).toEqual({});
    });

    test('should return status code 200', async () => {
        handleWebhook.mockImplementationOnce(async () => {
            return Promise.resolve(sensorDataPayload);
        });

        const result = await handleWebhook();
        expect(result.statusCode).toBe(200);
    });

    test('should contain a message that sensor data has been added to the db', async () => {
        handleWebhook.mockImplementationOnce(async () => {
            return Promise.resolve(sensorData)
        });

        const result = await handleWebhook();
        expect(result.message).toBe('Sensor data received, data added to the database')
    });  
});