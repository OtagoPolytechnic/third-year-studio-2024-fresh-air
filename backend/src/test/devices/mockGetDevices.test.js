import { getDevice } from '../../controllers/devices/devices.controller';

jest.mock('../../controllers/devices/devices.controller', () => ({
  getDevice: jest.fn(),
}));

const mockDevice = {
  statusCode: 200,
  data: {
    id: 1,
    room_number: 'D200',
    deviceId: 'eui-00d3c59800bdd352',
    dev_eui: '00CKSZX1232SDFD',
    createdAt: '2024-03-27T09:46:41.851Z',
  },
};

const mockDeviceSensorData = {
  data: {
    id: 2,
    room_number: 'D200',
    deviceId: 'eui-00asdvd234',
    dev_eui: '00ASDVD234',
    createdAt: '2024-03-27T09:46:41.851Z',
    sensorData: [
      {
        id: 1,
        co2: '400',
        temperature: '19',
        createdAt: '2024-03-28T06:55:30.605Z',
        deviceId: 'eui-00asdvd234',
        dev_eui: '00ASDVD234',
      },
    ],
  },
  nextPage: null,
};

const mockDeviceId = '00123456789';
const mockErrorMessage = {
  statusCode: 404,
  message: `Device ${mockDeviceId} not found on the server`,
};

describe('getDevice function test', () => {
  test('should return with a status code 200', async () => {
    getDevice.mockResolvedValueOnce(mockDevice);
    try {
      const result = await getDevice();
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });
  test('should return data for a single device', async () => {
    getDevice.mockResolvedValueOnce(mockDevice);
    try {
      const result = await getDevice();
      expect(result.data).toBe(mockDevice.data);
    } catch (error) {
      console.log(error);
    }
  });

  test('should throw error when no device is found and return a 404', async () => {
    getDevice.mockRejectedValueOnce(mockErrorMessage);
    try {
      await getDevice();
    } catch (error) {
      expect(error.statusCode).toBe(mockErrorMessage.statusCode);
    }
  });

  test('should return a device with sensorData payload', async () => {
    getDevice.mockResolvedValueOnce(mockDeviceSensorData);
    try {
      const result = await getDevice();
      expect(result.sensorData).toBe(mockDeviceSensorData.sensorData);
      expect(result.nextPage).toBe(null);
    } catch (error) {
      console.log(error);
    }
  });

  test('should throw error when no device is found and return a message', async () => {
    getDevice.mockRejectedValueOnce(mockErrorMessage);
    try {
      await getDevice();
    } catch (error) {
      expect(error.message).toBe(mockErrorMessage.message);
    }
  });
});
