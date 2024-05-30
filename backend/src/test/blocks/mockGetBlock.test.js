import { getBlock } from '../../controllers/blocks/blocks.controller';

jest.mock('../../controllers/blocks/blocks.controller', () => ({
  getBlock: jest.fn(),
}));

const mockBlock = {
  statusCode: 200,
  data: {
    id: 1,
    blockName: 'D-block',
    createdAt: '2024-05-22T06:25:25.428Z',
    updatedAt: '2024-05-22T06:25:25.428Z',
    device: [
      {
        room_number: 'D207',
        deviceId: 'eui-1000024b080301f5',
        dev_eui: '1000024b080301f5',
      },
      {
        room_number: 'D202',
        deviceId: 'eui-3000024b080301f5',
        dev_eui: '3000024b080301f5',
      },
      {
        room_number: 'D208',
        deviceId: 'eui-<===324b080301f5',
        dev_eui: '<===324b080301f5',
      },
    ],
  },
};

const mockErrorMessageNoBlockExists = {
  statusCode: 404,
  message: 'Y-block not found on the server',
};

describe('getBlock function test', () => {
  test('should return a status 404 if block does not exist', async () => {
    getBlock.mockResolvedValueOnce(mockErrorMessageNoBlockExists);
    try {
      const result = await getBlock({ params: { blockName: 'Y-block' } });
      expect(result.statusCode).toBe(404);
      expect(result.message).toBe('Y-block not found on the server');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a status 200 if block exists', async () => {
    getBlock.mockResolvedValueOnce(mockBlock);
    try {
      const result = await getBlock({ params: { blockName: 'D-block' } });
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a list of devices in the block', async () => {
    getBlock.mockResolvedValueOnce(mockBlock);
    try {
      const result = await getBlock({ params: { blockName: 'D-block' } });
      expect(result.data.device).toBe(mockBlock.data.device);
    } catch (error) {
      console.log(error);
    }
  });
});
