const mongoose = require('mongoose');

// mongoose.connect('mongodb://192.168.218.161:27017/app-node');
mongoose.connect('mongodb://avid:avid789@18.223.242.20:27017/app-node');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    //console.log('db connection success');
});

module.exports = db;
