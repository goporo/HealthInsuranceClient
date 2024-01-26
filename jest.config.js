/** @type {import('jest').Config} */

const config = {
    verbose: true,
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^public/(.*)$': '<rootDir>/public/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        "^routes/(.*)$": "<rootDir>/src/routes/$1",
        "^utils/(.*)$": "<rootDir>/src/utils/$1",
        "^pages/(.*)$": "<rootDir>/src/pages/$1",
        "^hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^requests/(.*)$": "<rootDir>/src/requests/$1",
        "^services/(.*)$": "<rootDir>/src/services/$1",
        "^config/(.*)$": "<rootDir>/src/config/$1",



    },
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        './src/**/*.{js,jsx,ts,tsx}',
        '!./src/**/_*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    testEnvironment: 'jest-environment-jsdom',
};

module.exports = config;
