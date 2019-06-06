const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    user_name: String,
    password: String,
    status: Number,   
    permission: Number,    
    permission_name: String,
    token: String,
    name:String,
    email:String,
    additional_email:String,
    serial_number:String,
    create_time: String,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;