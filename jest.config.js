export default {
 testEnvironment: "node",
 testMatch: ["**/*.test.js"],
 transform: {
   "^.+\\.[jt]sx?$": "babel-jest",
 },
};
