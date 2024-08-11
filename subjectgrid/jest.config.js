module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    testMatch: ['**/*.test.ts'],
};  