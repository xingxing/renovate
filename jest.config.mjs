const ci = !!process.env.CI;

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  cacheDirectory: '.cache/jest',
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.{js,ts}',
    '!lib/**/*.{d,spec}.ts',
    '!lib/**/{__fixtures__,__mocks__,__testutil__,test}/**/*.{js,ts}',
    '!lib/**/types.ts',
  ],
  coverageReporters: ci
    ? ['html', 'json', 'text-summary']
    : ['html', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 98,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/', '/__fixtures__/'],
  // reporters: ci ? ['default', 'jest-github-actions-reporter'] : ['default'],
  setupFilesAfterEnv: [
    'jest-extended/all',
    'expect-more-jest',
    '<rootDir>/test/setup.ts',
    '<rootDir>/test/to-migrate.ts',
  ],
  snapshotSerializers: ['<rootDir>/test/newline-snapshot-serializer.ts'],
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  watchPathIgnorePatterns: ['<rootDir>/.cache/', '<rootDir>/coverage/'],
};

/** @type {import('ts-jest').InitialOptionsTsJest} */
const localConfig = {
  preset: 'ts-jest',
  coverageReporters: ['html', 'text-summary'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      diagnostics: false,
      isolatedModules: true,
    },
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
const ciConfig = {
  collectCoverageFrom: [
    'tmp/**/*.js',
    '!tmp/**/*.spec.js',
    '!lib/**/{__fixtures__,__mocks__,__testutil__,test}/**/*.js',
    '!lib/**/types.js',
  ],
  coverageReporters: ['html', 'json', 'text-summary'],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\/expose.cjs$': '<rootDir>/lib/expose.cjs',
  },
  setupFilesAfterEnv: [
    'jest-extended/all',
    'expect-more-jest',
    '<rootDir>/tmp/test/setup.js',
    '<rootDir>/tmp/test/to-migrate.js',
  ],
  snapshotSerializers: ['<rootDir>/tmp/test/newline-snapshot-serializer.js'],
  // testMatch: ['tmp/**/*.spec.js'],
  // transform: {},
};

export default {
  ...config,
  ...(ci ? ciConfig : localConfig),
};
