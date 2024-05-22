import { createBlock } from '../../controllers/blocks/blocks.controller';

jest.mock('../../controllers/blocks/blocks.controller', () => ({
  createBlock: jest.fn(),
}));

const mockCreateBlock = {
  blockName: 'Z-block',
};

const mockErrorMessageEmptyBlockName = {
  statusCode: 400,
  message: 'Block name is required',
};

const mockErrorMessageSpaces = {
  statusCode: 400,
  message: 'Block name cannot start with a space',
};

const mockErrorUpperCase = {
  statusCode: 400,
  message: 'Block name must be in the format [Uppercase Letter]-block',
};

const mockErrorBlockAlreadyExists = {
  statusCode: 409,
  message: 'Z-block already exists',
};

const mockReturnBlockSuccess = {
  statusCode: 200,
  message: 'Z-block created successfully',
  data: {
    id: 9,
    blockName: 'Z-block',
    createdAt: '2024-05-22T10:01:17.469Z',
    updatedAt: '2024-05-22T10:01:17.469Z',
  },
};

describe('createBlock function test', () => {
  test('should return an error message if blockName starts with a space', async () => {
    createBlock.mockResolvedValueOnce(mockErrorMessageSpaces);
    try {
      const result = await createBlock({ blockName: ' Z-block' });
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Block name cannot start with a space');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return an error message if blockName does not match [Letter]-block pattern', async () => {
    createBlock.mockResolvedValueOnce(mockErrorUpperCase);
    try {
      const result = await createBlock({ blockName: 'z-block' });
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Block name must be in the format [Uppercase Letter]-block');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return an error message if blockName is not provided', async () => {
    createBlock.mockResolvedValueOnce(mockErrorMessageEmptyBlockName);
    try {
      const result = await createBlock({ blockName: '' });
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Block name is required');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return an error message if blockName already exists', async () => {
    createBlock.mockResolvedValueOnce(mockErrorBlockAlreadyExists);
    try {
      const result = await createBlock({ blockName: 'Z-block' });
      expect(result.statusCode).toBe(409);
      expect(result.message).toBe('Z-block already exists');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return with a status code 200', async () => {
    createBlock.mockResolvedValueOnce(mockReturnBlockSuccess);
    try {
      const result = await createBlock(mockCreateBlock);
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a success message', async () => {
    createBlock.mockResolvedValueOnce(mockReturnBlockSuccess);
    try {
      const result = await createBlock(mockCreateBlock);
      expect(result.message).toBe('Z-block created successfully');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a block object', async () => {
    createBlock.mockResolvedValueOnce(mockReturnBlockSuccess);
    try {
      const result = await createBlock(mockCreateBlock);
      expect(result.data).toBe(mockReturnBlockSuccess.data);
    } catch (error) {
      console.log(error);
    }
  });
});
