var path = require('path');
var env = process.env.NODE_ENV || 'production';
env = env.toLowerCase();
var file_path = path.resolve(__dirname, env);
try {
  module.exports = require(file_path);
} catch (err) {
  throw err;
}

