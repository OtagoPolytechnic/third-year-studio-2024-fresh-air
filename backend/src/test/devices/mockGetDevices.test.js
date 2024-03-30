import { getDevice } from '../../controllers/devices/devices.controller';

jest.mock('../../controllers/devices/devices.controller', () => ({
  getDevice: jest.fn(),
}));
