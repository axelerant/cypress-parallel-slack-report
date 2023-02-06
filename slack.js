const { createReadStream } = require('fs');
const { WebClient } = require('@slack/web-api');
const token = 'xoxb-2181353489-3901471769702-dm3bymTldFCgyOHjV9TduFF9';
const channelId = 'C03NKBG3QTF';
const web = new WebClient(token);
var fs = require('fs');
var path = require('path');
var dirPath = path.resolve('public');
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
        file: createReadStream(`public/${type}`),
        channels: channelId,
      });
    };
    uploadFileToSlack();
  }
});
