export default {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/__tests__/**/*.test.js', '**/__tests__/**/*.test.jsx'],
    moduleNameMapper: {},
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    testEnvironment: 'jsdom',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom',
    ],
};  