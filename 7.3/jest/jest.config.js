const config = {
  collectCoverage: true,
  collectCoverageFrom: [
      "**/*.{js,jsx}",
      "!**/node_modules/**",
      "!**/coverage/**",
      "!**/jest.config.js",
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
      global: {
          branches: 100,
          functions: 100,
          lines: 100,
      },
  },
};

module.exports = config;