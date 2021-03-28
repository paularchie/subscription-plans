module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.(js|ts|tsx)$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.(css|ico|scss|jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$": "<rootDir>/jestMocks.js",
  },
  testMatch: ['**/*.test.tsx'],
  collectCoverage: false,
  "collectCoverageFrom": [
    "src/common/components/**/*.{ts,tsx}",
    "src/pages/**/*.{ts,tsx}",
  ],
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json",
      "enableTsDiagnostics": true
    }
  }
}