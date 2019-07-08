module.exports = {
  verbose: true,
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {},
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
  ],  
  projects: [
    {
      displayName: "web", 
      testEnvironment: "jsdom",
      collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
      testMatch: ["<rootDir>/src/**/?(*.)test.{js,jsx,mjs}"],
      coverageThreshold: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100
        }
      },

    },
    {
      displayName: "react-native", 
      testEnvironment: "node",
      globals: {
        navigator: { 
          product: "ReactNative"  
        }      
      },
      testMatch: ["<rootDir>/src/**/?(*.)test-rn.{js,jsx,mjs}"],
    },
    {
      displayName: "node", 
      testEnvironment: "node",
      testMatch: ["<rootDir>/src/**/?(*.)test-node.{js,jsx,mjs}"],
    }    
  ]
  
  
};
