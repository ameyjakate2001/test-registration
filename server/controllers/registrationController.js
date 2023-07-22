const nodemailer = require('nodemailer')
const OTP = require('../models/otp')
const Candidate = require('../models/candidate')
const axios = require('axios')

async function sendMail(email, otp) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'sedrick.orn12@ethereal.email',
      pass: '891RdhkUTBraGWTsg2',
    },
  })

  const info = await transporter.sendMail({
    from: '"Alog Test" <dewayne.barton@ethereal.email>', // sender address
    to: `${email}`, // list of receivers
    subject: 'Otp For Email Verification', // Subject line
    text: `Your otp is ${otp}`, // plain text body
  })

  console.log('Message sent: %s', info.messageId)
}

const sendOTP = async (req, res) => {
  console.log('in')
  const { email } = req.body
  //4 DIGIT OTP CREATED
  const numberedOTP = Math.floor(1000 + Math.random() * 9000)

  //OTP SENDING
  sendMail(email, numberedOTP)

  //DATABASE SAVE OTP
  if (await Candidate.findOne({ email })) {
    return res
      .status(400)
      .json({ success: false, error: 'user already registered' })
  }
  const isEmail = await OTP.findOne({ email: email })
  if (isEmail) {
    isEmail.otp = numberedOTP
    await isEmail.save()
    console.log('new otp added')
  } else {
    const otp = await OTP.create({
      email,
      otp: numberedOTP,
    })
    console.log(otp)
  }

  // res.send(numberedOTP)
  res.json({ success: true })
}

const verifyOTP = async (req, res) => {
  const { token, otp, name, email, state, city, subject, date, time } = req.body
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SERVER_CAPTCHA_KEY}&response=${token}`
    )
    if (!response.data.success) {
      return res
        .status(400)
        .json({ success: false, error: 'Please Verify Captcha' })
    }
    const isValid = await OTP.findOne({ email })
    if (isValid) {
      if (isValid.otp == otp) {
        const newCandidate = new Candidate({
          name,
          email,
          state_id: state,
          city_id: city,
          subject_id: subject,
          date_id: date,
          time_id: time,
        })
        await newCandidate.save()
        console.log('candidate saved')
        return res.json({ success: true })
      } else {
        return res.status(400).json({ success: false, error: 'Wrong Otp' })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { sendOTP, verifyOTP }
