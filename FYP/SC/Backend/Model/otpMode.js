// models/otpModel.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
email:{type:String,require:true},
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

const OtpModel = mongoose.model('Otp', otpSchema);
module.exports = OtpModel;
