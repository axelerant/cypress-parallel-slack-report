require('dotenv').config();
const { createReadStream } = require('fs');
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;
const web = new WebClient(token);
var fs = require('fs');
var path = require('path');
var dirPath = path.resolve('failed_screenshots');
var filesList;
fs.readdir(dirPath, function (err, files) {
  filesList = files.filter(function (e) {
    return path.extname(e).toLowerCase() === '.png';
  });
  for (const type of filesList) {
    console.log(`${type}`);
    const uploadFileToSlack = async () => {
      await web.files.upload({
        filename: 'Failed Tests',
        file: createReadStream(`failed_screenshots/${type}`),
        channels: channelId,
      });
    };
    uploadFileToSlack();
  }
});
