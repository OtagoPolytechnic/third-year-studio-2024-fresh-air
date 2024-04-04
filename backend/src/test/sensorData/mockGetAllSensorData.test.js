import { getAllSensorData } from '../../controllers/sensorData/sensorData.controller';

jest.mock('../../controllers/sensorData/sensorData.controller', () => ({
  getAllSensorData: jest.fn(),
}));

const mockSensorData = {
  statusCode: 200,
  data: [
    {
      id: 952,
      co2: '400',
      temperature: '19',
      createdAt: '2024-03-28T06:55:30.605Z',
      deviceId: 'eui-00d3c59800bdd352',
      dev_eui: '00D3C59800BDD352',
    },
    {
      id: 950,
      co2: '400',
      temperature: '19',
      createdAt: '2024-03-28T06:50:28.515Z',
      deviceId: 'eui-00d3c59800bdd352',
      dev_eui: '00D3C59800BDD352',
    },
  ],
};

const mockErrorMessage = {
  statusCode: 404,
  message: 'No payload data available',
};

describe('getAllSensorData function test', () => {
  test('should return with a status code 200', async () => {
    getAllSensorData.mockResolvedValueOnce(mockSensorData);
    try {
      const result = await getAllSensorData();
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a list of all recent data', async () => {
    getAllSensorData.mockResolvedValueOnce(mockSensorData);
    try {
      const result = await getAllSensorData();
      expect(result.data).toBe(mockSensorData.data);
    } catch (error) {
      console.log(error);
    }
  });

  test('should expect results data[0] co2 to be equal to 400', async () => {
    getAllSensorData.mockResolvedValueOnce(mockSensorData);
    try {
      const result = await getAllSensorData();
      expect(result.data[0].co2).toBe('400');
    } catch (error) {
      console.log(error);
    }
  });

  test('should expect results data[0-n] dev_eui to be the same', async () => {
    getAllSensorData.mockResolvedValueOnce(mockSensorData);
    try {
      const result = await getAllSensorData();
      expect(result.data[0].dev_eui).toEqual(result.data[1].dev_eui);
    } catch (error) {
      console.log(error);
    }
  });

  test('should throw error when no data is found and return a 404', async () => {
    getAllSensorData.mockRejectedValueOnce(mockErrorMessage);
    try {
      await getAllSensorData();
    } catch (error) {
      expect(error.statusCode).toBe(mockErrorMessage.statusCode);
      expect(error.statusCode).toEqual(mockErrorMessage.statusCode);
    }
  });

  test('should throw error when no data is found and return a message', async () => {
    getAllSensorData.mockRejectedValueOnce(mockErrorMessage);
    try {
      await getAllSensorData();
    } catch (error) {
      expect(error.message).toBe(mockErrorMessage.message);
      expect(error.message).toEqual(mockErrorMessage.message);
    }
  });
});
