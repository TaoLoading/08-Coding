module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testMatch: ['**/(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules'],
}
