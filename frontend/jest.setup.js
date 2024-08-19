const fetch = require('node-fetch');

global.fetch = fetch;

const ResizeObserver = require('./src/__mocks__/resize-observer').ResizeObserver;
global.ResizeObserver = ResizeObserver;

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
