export default {
    verbose: false, // Reduce the amount of output in the terminal
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/', '\\.css$'],
    testMatch: ['**/__tests__/**/*.test.js', '**/__tests__/**/*.test.jsx'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    testEnvironment: 'jsdom',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    setupFiles: ['./jest.setup.js'],  // Already correct
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Point to your setup file
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
};
