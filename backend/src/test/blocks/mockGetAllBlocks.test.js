import { getAllBlocks } from '../../controllers/blocks/blocks.controller';

jest.mock('../../controllers/blocks/blocks.controller', () => ({
  getAllBlocks: jest.fn(),
}));

const mockBlocks = {
  statusCode: 200,
  data: [
    {
      id: 1,
      blockName: 'A-block',
      createdAt: '2024-05-22T10:01:17.469Z',
      updatedAt: '2024-05-22T10:01:17.469Z',
    },
    {
      id: 2,
      blockName: 'B-block',
      createdAt: '2024-05-22T10:01:17.469Z',
      updatedAt: '2024-05-22T10:01:17.469Z',
    },
  ],
  nextPage: null,
};

const mockErrorNoBlocks = {
  statusCode: 400,
  message: 'No buildings found on the server',
};

describe('getAllBlocks function test', () => {
  test('should return with a message no buildings found', async () => {
    getAllBlocks.mockResolvedValueOnce(mockErrorNoBlocks);
    try {
      const result = await getAllBlocks();
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('No buildings found on the server');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return with a status code 200', async () => {
    getAllBlocks.mockResolvedValueOnce(mockBlocks);
    try {
      const result = await getAllBlocks();
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return with a list of all blocks', async () => {
    getAllBlocks.mockResolvedValueOnce(mockBlocks);
    try {
      const result = await getAllBlocks();
      expect(result.data).toBe(mockBlocks.data);
    } catch (error) {
      console.log(error);
    }
  });

  test('should expect results data[0] blockName to be equal to A-block', async () => {
    getAllBlocks.mockResolvedValueOnce(mockBlocks);
    try {
      const result = await getAllBlocks();
      expect(result.data[0].blockName).toBe('A-block');
    } catch (error) {
      console.log(error);
    }
  });
});
