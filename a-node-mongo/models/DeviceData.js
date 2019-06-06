const mongoose =require('mongoose');

const Schema = new mongoose.Schema({
    SerialNumber: String,
    PCBNumber: String,
    BluetoothNumber: String,
    UserInfo: {
        PatientName: String,
        PatientEmail: String,
        DoctorEmail: String,
        DeviceName: String,
    },
    UpdateData: [
        {
            ConfigData: {
                ComplianceTime: String,
                Language: String,
                Brightness: String,
                Audible: Boolean,
                NightMode: Boolean
            },
            PresetData: [{
                    PresetNumber: String,
                    ElectrodeSize: String,
                    StimulationType: String,
                    ModeSettings: String,
                    TreatmentTime: String,
                    NumberOfCycles: String,
                    NextPresetToUse: String,
                    BeatFrequency: String,
            }],
            UsageData: [{
                    Type: String,   // U => Usage Data    A => AnswerData
                    DateOfTreatment: String,
                    TimeOfTreatment: String,
                    PresetNumber: String,
                    PresetData: {
                        PresetNumber: String,
                        ElectrodeSize: String,
                        StimulationType: String,
                        ModeSettings: String,
                        TreatmentTime: String,
                        NumberOfCycles: String,
                        NextPresetToUse: String,
                        BeatFrequency: String
                    },
                    ConfigData: {
                        ComplianceTime: String,
                        Language: String,
                        Brightness: String,
                        Audible: String,
                        NightMode: String
                    },
                    MinOfUse: String,
                    MinOfPause: String,
                    Channel1MaxAmpUsed: String,
                    Channel1AverageAmpUsed: String,
                    Channel2MaxAmpUsed: String,
                    Channel2AverageAmpUsed: String,
                    PainBefore:  String,
                    PainAfter:  String,
                    DecrMeds:  String,
                    HelpWork:  String,
                    HelpHome:  String,
                    Address:  String,
            }],
            UpdateTime: { type: String, default: Date.now() },
        }
    ],
});

const model = mongoose.model('devicedata', Schema);

module.exports = model;


