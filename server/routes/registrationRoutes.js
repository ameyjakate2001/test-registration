const express = require('express')
const { sendOTP, verifyOTP } = require('../controllers/registrationController')

const router = express.Router()
router.post('/sent', sendOTP)
router.post('/verify', verifyOTP)

module.exports = router
