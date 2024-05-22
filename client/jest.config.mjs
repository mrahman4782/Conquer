export default {
    testEnvironment: 'node',
    moduleNameMapper: {
      '^firebase/auth$': '<rootDir>/node_modules/firebase/auth/dist/index.cjs.js', // Ensure correct path resolution
    },
    
  };
  