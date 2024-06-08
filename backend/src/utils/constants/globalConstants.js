export const INDEX_PATHS = {
  BASE_URL: 'api',
  CURRENT_VERSION: 'v1',
};

export const PORTS = {
  SERVER_PORT: 3000,
};

export const PAGINATION_DEFAULTS = {
  amount: 10,
  page: 1,
};

export const WS_DEFAULTS = {
  ping_interval: 30000,
  pong_timeout: 5000,
  max_message_size: 1024, //1kb
  rate_limit: 10, // 10 messages per second
  time_frame: 1000,
};
