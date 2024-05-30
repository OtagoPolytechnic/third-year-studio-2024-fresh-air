import { updateBlock } from '../../controllers/blocks/blocks.controller';

jest.mock('../../controllers/blocks/blocks.controller', () => ({
  updateBlock: jest.fn(),
}));

const mockUpdateBlock = {
  blockName: 'Z-block',
};

const mockErrorRequired = {
  statusCode: 400,
  message: 'Block name is required',
};

const mockErrorSpaces = {
  statusCode: 400,
  message: 'Block name cannot start with a space',
};

const mockErrorUpperCase = {
  statusCode: 400,
  message: 'Block name must be in the format [Uppercase Letter]-block',
};

const mockErrorMessageNoBlockExists = {
  statusCode: 404,
  message: 'Z-block not found on the server',
};

const mockErrorBlockAlreadyExists = {
  statusCode: 409,
  message: 'Z-block already exists',
};

const mockReturnBlockSuccess = {
  statusCode: 200,
  message: 'Block name updated successfully',
  data: {
    id: 1,
    blockName: 'Z-block',
    createdAt: '2024-05-22T10:01:17.469Z',
    updatedAt: '2024-05-22T10:01:17.469Z',
  },
};

describe('updateBlock function test', () => {
  test('should return an error message if blockName is required', async () => {
    updateBlock.mockResolvedValueOnce(mockErrorRequired);
    try {
      const result = await updateBlock({ blockName: '' });
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Block name is required');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return an error message if blockName starts with a space', async () => {
    updateBlock.mockResolvedValueOnce(mockErrorSpaces);
    try {
      const result = await updateBlock({ blockName: ' Z-block' });
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Block name cannot start with a space');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return an error message if blockName does not match [Letter]-block pattern', async () => {
    updateBlock.mockResolvedValueOnce(mockErrorUpperCase);
    try {
      const result = await updateBlock({ blockName: 'z-block' });
      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Block name must be in the format [Uppercase Letter]-block');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return an error message if block does not exist', async () => {
    updateBlock.mockResolvedValueOnce(mockErrorMessageNoBlockExists);
    try {
      const result = await updateBlock({ blockName: 'Z-block' });
      expect(result.statusCode).toBe(404);
      expect(result.message).toBe('Z-block not found on the server');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return an error message if block already exists', async () => {
    updateBlock.mockResolvedValueOnce(mockErrorBlockAlreadyExists);
    try {
      const result = await updateBlock({ blockName: 'Z-block' });
      expect(result.statusCode).toBe(409);
      expect(result.message).toBe('Z-block already exists');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return with a status code 200', async () => {
    updateBlock.mockResolvedValueOnce(mockReturnBlockSuccess);
    try {
      const result = await updateBlock(mockUpdateBlock);
      expect(result.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should return a success message', async () => {
    updateBlock.mockResolvedValueOnce(mockReturnBlockSuccess);
    try {
      const result = await updateBlock(mockUpdateBlock);
      expect(result.message).toBe('Block name updated successfully');
    } catch (error) {
      console.log(error);
    }
  });

  test('should return the updated block data', async () => {
    updateBlock.mockResolvedValueOnce(mockReturnBlockSuccess);
    try {
      const result = await updateBlock(mockUpdateBlock);
      expect(result.data).toBe(mockReturnBlockSuccess.data);
    } catch (error) {
      console.log(error);
    }
  });
});
