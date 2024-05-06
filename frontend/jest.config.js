export default {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Used to transform JSX to JS with babel
    },
    transformIgnorePatterns: ['/node_modules/', "\\.css$"], // Ignore CSS files in transform
    testMatch: ['**/__tests__/**/*.test.js', '**/__tests__/**/*.test.jsx'], // Finds test files that match the pattern
    moduleNameMapper: {},
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'], // Allows us to import jsx files
    testEnvironment: 'jsdom', // Sets it to run tests in jsdom
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom', // Sets up Jest environment after loading testing-library
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy" // Mocks CSS and LESS imports with identity-obj-proxy
    },
};  