const data = require('../src/intl/en.json');
const transferedData = require('../src/intl/zh-tw.json');
const fs = require('fs');

for (const [key, value] of Object.entries(data)) {
  if (!transferedData.hasOwnProperty(key)) {
    transferedData[key] = value;
  }
}
fs.writeFileSync('src/intl/zh-tw.json', JSON.stringify(transferedData, null, 2));
