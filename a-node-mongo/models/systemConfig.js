const mongoose =require('mongoose');

const Schema = new mongoose.Schema({
   serialCode: String,
    presetCode:String,

});

const model = mongoose.model('systemConfig', Schema);

module.exports = model;