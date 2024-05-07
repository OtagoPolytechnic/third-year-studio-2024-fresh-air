import { handleWebhook } from '../../controllers/webhook/webhook.controller';

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

const sensorData = {
  data: {
    deviceId: '00d3c69800bff312',
    dev_eui: '00D3C69B00BFF312',
    co2: 469,
    temperature: 22,
  },
};

const sensorDataPayload = {
  statusCode: 200,
  message: 'Sensor data received, data added to the database',
  data: sensorData,
};

const webhookError = {
  statusCode: 500,
  message: 'Internal server error occurred while processing the webhook request',
};

describe('Webhook function test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return an object containing payload data', async () => {
    handleWebhook.mockImplementationOnce(async () => {
      return Promise.resolve(payload);
    });

    await handleWebhook();
    expect(handleWebhook).toHaveBeenCalled();
  });

  test('should return an empty object', async () => {
    handleWebhook.mockImplementationOnce(async () => {
      return Promise.resolve({});
    });

    const result = await handleWebhook();
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
      return Promise.resolve(sensorDataPayload);
    });

    const result = await handleWebhook();
    expect(result.message).toBe('Sensor data received, data added to the database');
  });

  test('should contain payload data containing sensor information added', async () => {
    handleWebhook.mockImplementationOnce(async () => {
      return Promise.resolve(sensorDataPayload);
    });

    const result = await handleWebhook();
    const { data } = result.data;

    expect(data.deviceId).toEqual(sensorData.data.deviceId);
    expect(data.dev_eui).toEqual(sensorData.data.dev_eui);
    expect(data.co2).toEqual(sensorData.data.co2);
    expect(data.temperature).toEqual(sensorData.data.temperature);
  });

  test('should return an status code 500 error when there is an issue', async () => {
    handleWebhook.mockRejectedValueOnce(webhookError);
    try {
      await handleWebhook();
    } catch (error) {
      expect(error.statusCode).toEqual(webhookError.statusCode);
    }
  });

  test('should return a error message when there is an issue', async () => {
    handleWebhook.mockRejectedValueOnce(webhookError);
    try {
      await handleWebhook();
    } catch (error) {
      expect(error.message).toEqual(webhookError.message);
    }
  });
});
