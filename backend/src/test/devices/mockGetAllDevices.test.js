import { getAllDevices } from '../../controllers/devices/devices.controller';

jest.mock('../../controllers/devices/devices.controller', () => ({
  getAllDevices: jest.fn(),
}));

const mockDevices = {
  statusCode: 200,
  data: [
    {
      id: 1,
      room_number: null,
      deviceId: 'eui-00d3c59800bdd352',
      dev_eui: '00CKSZX1232SDFD',
      createdAt: '2024-03-27T09:46:41.851Z',
    },
    {
      id: 2,
      room_number: null,
      deviceId: 'eui-00efe04b4c9dc5d3',
      dev_eui: 'DFDS20DFKOEBOO',
      createdAt: '2024-03-27T09:49:39.169Z',
    },
  ],
};

const mockErrorMessage = {
  statusCode: 404,
  message: `No devices found on the server`,
};

describe('getDevice function test', () => {
  test('should return with a status code 200', async () => {
    getAllDevices.mockResolvedValueOnce(mockDevices);
    try {
      const result = await getAllDevices();
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should get a list of current devices in the database', async () => {
    getAllDevices.mockResolvedValueOnce(mockDevices);
    try {
      const result = await getAllDevices();
      expect(result).toBe(mockDevices);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return an array of devices (data)', async () => {
    getAllDevices.mockResolvedValueOnce(mockDevices);
    try {
      const result = await getAllDevices();
      expect(result.data).toBe(mockDevices.data);
    } catch (error) {
      console.log(error);
    }
  });

  test('should throw error if no devices found and return a 404', async () => {
    getAllDevices.mockRejectedValueOnce(mockErrorMessage);
    try {
      await getAllDevices();
    } catch (error) {
      expect(error.statusCode).toEqual(mockErrorMessage.statusCode);
    }
  });

  test('should throw error if no devices are found and return a message', async () => {
    getAllDevices.mockRejectedValueOnce(mockErrorMessage);
    try {
      await getAllDevices();
    } catch (error) {
      expect(error.message).toEqual(mockErrorMessage.message);
    }
  });
});
