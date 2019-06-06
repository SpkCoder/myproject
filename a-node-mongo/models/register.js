const mongoose =require('mongoose');

const Schema = new mongoose.Schema({
    SerialNumber: String,
    BluetoothNumber: String,
    PCBNumber: String,
    status: Number,    //0=>Mfg  1=>Final  2=>Incoming
    register_name: String,
    register_time: String,
    register_data: [{
                    code: String,
                    value: String,
                    value2: String,
                    name: String,
            }],
    activate_name: String,
    activate_time: String,
    activate_data: [{
                    code: String,
                    value: String,
                    value2: String,
                    name: String,
            }],
    check_name: String,
    check_time: String,
});

const model = mongoose.model('register', Schema);

module.exports = model;