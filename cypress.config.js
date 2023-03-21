const { defineConfig } = require("cypress");
const fs = require("fs");
const cypressSplit = require("cypress-split");

module.exports = defineConfig({
  env: {
    slack_token: 'xoxb-2181353489-3901471769702-dFHgPqsxkfatkd8uEP9ZZGLn',
    slack_channelId: 'C03NKBG3QTF',
  },
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
