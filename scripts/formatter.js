const data = require('../src/intl/en.json');

exports.format = function (msgs) {
  const results = {}
  for (const [id, msg] of Object.entries(msgs)) {
    results[id] = data[id]?? (msg.defaultMessage?? '');
  }
  return results
}
