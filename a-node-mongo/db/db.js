const mongoose = require('mongoose');

// mongoose.connect('mongodb://admin:123456@192.168.218.161:27017/avid_db');
mongoose.connect('mongodb://127.0.0.1:27017/avid_db');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    //console.log('db connection success');
});

module.exports = db;
