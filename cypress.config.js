const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
     e2e: {
    baseUrl: "http://localhost:8008", // URL de votre application
    supportFile: false,
  },
  },
});
