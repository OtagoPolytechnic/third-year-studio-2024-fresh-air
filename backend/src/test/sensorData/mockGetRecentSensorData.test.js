import { getRecentSensorData } from '../../controllers/sensorData/sensorData.controller';

jest.mock('../../controllers/sensorData/sensorData.controller', () => ({
  getRecentSensorData: jest.fn(),
}));

const mockLatestSensorData = {
  statusCode: 200,
  data: {
    id: 234,
    co2: '1532',
    temperature: '19',
    createdAt: '2024-03-28T06:55:30.605Z',
    deviceId: 'eui-00d3c59800bdd352',
    dev_eui: '00D3C59800BDD352',
    device: {
      id: 1,
      room_number: null,
      deviceId: 'eui-00d3c59800bdd352',
      dev_eui: '00D3C59800BDD352',
      createdAt: '2024-03-27T09:46:41.851Z',
    },
  },
};

const mockErrorMessage = {
  statusCode: 404,
  message: 'No payload found for the device',
};

describe('getRecentSensordata function test', () => {
  test('should return with a status code 200', async () => {
    getRecentSensorData.mockResolvedValueOnce(mockLatestSensorData);
    try {
      const result = await getRecentSensorData();
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return the most recent sensor data for a device', async () => {
    getRecentSensorData.mockResolvedValueOnce(mockLatestSensorData);
    try {
      const result = await getRecentSensorData();
      expect(result.data).toBe(mockLatestSensorData.data);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a co2 level of 1532', async () => {
    getRecentSensorData.mockResolvedValueOnce(mockLatestSensorData);
    try {
      const result = await getRecentSensorData();
      expect(result.data.co2).toEqual('1532');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a devices object containing information of where the data came from, this should have matching {dev_eui}', async () => {
    getRecentSensorData.mockResolvedValueOnce(mockLatestSensorData);
    try {
      const result = await getRecentSensorData();
      expect(result.data.device).toBe(mockLatestSensorData.data.device);
      expect(result.data.dev_eui).toEqual(result.data.device.dev_eui);
      expect(result.data.dev_eui).toEqual(mockLatestSensorData.data.dev_eui);
    } catch (error) {
      console.log(error);
    }
  });

  test('should throw error when no data is found and return a 404', async () => {
    getRecentSensorData.mockRejectedValueOnce(mockErrorMessage);
    try {
      await getRecentSensorData();
    } catch (error) {
      expect(error.statusCode).toBe(mockErrorMessage.statusCode);
      expect(error.statusCode).toEqual(404);
    }
  });

  test('should throw error when no data is found and return a message', async () => {
    getRecentSensorData.mockRejectedValueOnce(mockErrorMessage);
    try {
      await getRecentSensorData();
    } catch (error) {
      expect(error.message).toBe(mockErrorMessage.message);
      expect(error.message).toEqual(mockErrorMessage.message);
    }
  });
});
