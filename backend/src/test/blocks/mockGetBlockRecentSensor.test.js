import { getBlockRecentSensor } from '../../controllers/blocks/blocks.controller';

jest.mock('../../controllers/blocks/blocks.controller', () => ({
  getBlockRecentSensor: jest.fn(),
}));

const mockBlockRecentSensor = {
  statusCode: 200,
  data: {
    id: 1,
    blockName: 'D-block',
    createdAt: '2024-05-22T06:25:25.428Z',
    updatedAt: '2024-05-22T06:25:25.428Z',
    device: [
      {
        room_number: 'D313',
        deviceId: 'eui-1000024b080301f5',
        dev_eui: '1000024b080301f5',
        sensorData: [
          {
            co2: '999',
            temperature: '30',
          },
        ],
      },
      {
        room_number: 'D202',
        deviceId: 'eui-3000024b080301f5',
        dev_eui: '3000024b080301f5',
        sensorData: [],
      },
      {
        room_number: 'D207',
        deviceId: 'eui-<===324b080301f5',
        dev_eui: '<===324b080301f5',
        sensorData: [],
      },
    ],
  },
};

const mockErrorMessageNoBlockExists = {
  statusCode: 404,
  message: 'Y-block not found on the server',
};

describe('getBlockRecentSensor function test', () => {
  test('should return a status 404 if block does not exist', async () => {
    getBlockRecentSensor.mockResolvedValueOnce(mockErrorMessageNoBlockExists);
    try {
      const result = await getBlockRecentSensor({ params: { blockName: 'Y-block' } });
      expect(result.statusCode).toBe(404);
      expect(result.message).toBe('Y-block not found on the server');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a status 200 if block exists', async () => {
    getBlockRecentSensor.mockResolvedValueOnce(mockBlockRecentSensor);
    try {
      const result = await getBlockRecentSensor({ params: { blockName: 'D-block' } });
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a list of devices in the block', async () => {
    getBlockRecentSensor.mockResolvedValueOnce(mockBlockRecentSensor);
    try {
      const result = await getBlockRecentSensor({ params: { blockName: 'D-block' } });
      expect(result.data).toBe(mockBlockRecentSensor.data);
    } catch (error) {
      console.log(error);
    }
  });
});
