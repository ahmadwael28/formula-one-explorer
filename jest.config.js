// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',  // needed for testing DOM-related code
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // optional, if you want to add custom setup
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  // ignore CSS imports
    },
};
