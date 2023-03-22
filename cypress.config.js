const { defineConfig } = require("cypress");
const fs = require("fs");
const cypressSplit = require("cypress-split");

module.exports = defineConfig({
  watchForFileChanges: false,
  reporter: 'mochawesome',
  reporterOptions: {
    useInlineDiffs: true,
    embeddedScreenshots: true,
    reportDir: 'cypress/results',
    reportFilename: '[name].html',
    overwrite: true,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: "https://the-internet.herokuapp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        dynamicFiledownload: (downloadspath) => {
          return fs.readdirSync(downloadspath);
        },
      });
      on("before:run", (details) => {
        if (details.specs && details.browser) {
          // details.specs and details.browser will be undefined in interactive mode
          // console.log(details.specs);
        }
      });
      cypressSplit(on, config)

      // IMPORTANT: return the config object
      return config
    },
  },
});
