import { resolve } from 'path';

export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  rootDir: resolve(__dirname, '..'),
  displayName: 'e2e',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
};
