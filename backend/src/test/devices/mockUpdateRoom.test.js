import { updateDeviceRoom } from '../../controllers/devices/devices.controller';

jest.mock('../../controllers/devices/devices.controller', () => ({
  updateDeviceRoom: jest.fn(),
}));

const responseData = {
  statusCode: 200,
  message: 'Room number Updated Successfully',
  data: {
    id: 1,
    room_number: 'new_room',
    deviceId: 'eui-00d3c59800bdd352',
    dev_eui: '00D3C59800BDD352',
    createdAt: '2024-03-27T09:46:41.851Z',
  },
};

const roomAlreadyExists = {
  statusCode: 409,
  message: 'Device with room number new_room already exists in the database',
};

const deviceNotFound = {
  statusCode: 404,
  message: 'Device 00D3C59800BDD35 not found in the database',
};

describe('Update room', () => {
  beforeEach(() => {
    // Reset all mocks before each new test
    jest.clearAllMocks();
  });

  test('should update a room number', async () => {
    // Will mock updateDeviceRoom function once, returning updatedData
    updateDeviceRoom.mockImplementationOnce(async () => {
      return Promise.resolve(responseData);
    });

    const result = await updateDeviceRoom();
    expect(result.statusCode).toEqual(responseData.statusCode);
    expect(result.message).toEqual(responseData.message);
    expect(result.data.room_number).toEqual(responseData.data.room_number);
  });

  test('should find a room_number already existing', async () => {
    updateDeviceRoom.mockImplementationOnce(async () => {
      return Promise.resolve(roomAlreadyExists);
    });

    const result = await updateDeviceRoom();
    expect(result.statusCode).toBe(roomAlreadyExists.statusCode);
    expect(result.message).toBe(roomAlreadyExists.message);
  });

  test('should not find a device already existing', async () => {
    updateDeviceRoom.mockImplementationOnce(async () => {
      return Promise.resolve(deviceNotFound);
    });

    const result = await updateDeviceRoom();
    expect(result.statusCode).toBe(deviceNotFound.statusCode);
    expect(result.message).toBe(deviceNotFound.message);
  });
});
