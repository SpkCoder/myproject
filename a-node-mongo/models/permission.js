const mongoose =require('mongoose');

const Schema = new mongoose.Schema({
    permission: Number,
    permission_name: String,
});

const model = mongoose.model('permission', Schema);

module.exports = model;