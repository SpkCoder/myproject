const mongoose =require('mongoose');

const Schema = new mongoose.Schema({
    permission: Number,
    tableName: String,
    action: String,
});

const model = mongoose.model('function', Schema);

module.exports = model;