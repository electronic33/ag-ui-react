module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  preset: "ts-jest",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/", "/.storybook/"],
  moduleNameMapper: {
    "\\.css$": "jest-transform-css",
  },
};
