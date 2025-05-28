export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js','<rootDir>/src/setupTests.tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      tsconfig: './tsconfig.json',
    }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  collectCoverageFrom: [
    'src/components/CategoryListItem/*',
    'src/components/FilterBar/*.ts',
    'src/components/RecentTourList/*',
    'src/components/RecentTourListItem/*',
    'src/components/SearchBar/*.ts',
    'src/components/SmallSearchForm/*',
    'src/components/TourCard/*',
    'src/components/TourCardList/*',
    'src/pages/*'
  ]
};
