import fetch from 'node-fetch';

global.fetch = fetch;

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_BACKEND_API_KEY: 'http://mocked-api-key', // Mocked API key for testing
      },
    },
  },
  writable: true,
  configurable: true,
});
