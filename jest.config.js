module.exports = {
  roots: ["<rootDir>/src"],
  preset: 'ts-jest',
  // transform: {
  //   '^.+\\.(ts|tsx)?$': 'ts-jest',
  //   "^.+\\.(js|jsx)$": "babel-jest",
  // },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts']
};
