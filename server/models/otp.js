const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
})

const OTP = mongoose.model('otp', otpSchema)

module.exports = OTP
