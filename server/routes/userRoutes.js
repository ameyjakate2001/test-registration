const express = require('express')
const {
  loginUser,
  getCandidates,
  addData,
  deleteCandidate,
  getData,
} = require('../controllers/userController')

const router = express.Router()

// router.get('/', checkUser)
router.get('/candidates', getCandidates)
router.get('/data', getData)
router.get('/candidate/:id', deleteCandidate)
router.post('/signin', loginUser)
router.post('/addData', addData)

module.exports = router
