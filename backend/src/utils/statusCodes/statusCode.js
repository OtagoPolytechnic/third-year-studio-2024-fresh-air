export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  REQUEST_LIMIT: 429,
  SERVER_ERROR: 500,
};

export const SOCKET_STATUS_CODES = {
  NORMAL_CLOSURE: { code: 1000, reason: 'Normal closure' },
  GOING_AWAY: { code: 1001, reason: 'Endpoint is going away' },
  PROTOCOL_ERROR: { code: 1002, reason: 'Protocol error' },
  UNSUPPORTED_DATA: { code: 1003, reason: 'Unsupported data' },
  NO_STATUS_RECEIVED: { code: 1005, reason: 'No status received' },
  ABNORMAL_CLOSURE: { code: 1006, reason: 'Abnormal closure' },
  INVALID_FRAME_PAYLOAD_DATA: { code: 1007, reason: 'Invalid frame payload data' },
  POLICY_VIOLATION: { code: 1008, reason: 'Policy violation' },
  MESSAGE_TOO_BIG: { code: 1009, reason: 'Message too big' },
  MANDATORY_EXTENSION: { code: 1010, reason: 'Mandatory extension' },
  INTERNAL_SERVER_ERROR: { code: 1011, reason: 'Internal server error' },
  SERVICE_RESTART: { code: 1012, reason: 'Service restart' },
  TRY_AGAIN_LATER: { code: 1013, reason: 'Try again later' },
  BAD_GATEWAY: { code: 1014, reason: 'Bad gateway' },
};
