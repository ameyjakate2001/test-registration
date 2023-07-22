const Candidate = require('../models/candidate.js')
const jwt = require('jsonwebtoken')
const State = require('../models/Test/state.js')
const City = require('../models/Test/city.js')
const Subject = require('../models/Test/subject.js')
const Date = require('../models/Test/date.js')
const Time = require('../models/Test/time.js')

const maxAge = 3 * 24 * 60 * 60
const createWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge })
}

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .populate({
        path: 'state_id',
      })
      .populate({
        path: 'city_id',
      })
      .populate({
        path: 'subject_id',
      })
      .populate({
        path: 'date_id',
      })
      .populate({
        path: 'time_id',
      })

    res.json(candidates)
  } catch (error) {
    console.log(error)
  }
}

const deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
  }
}

const getData = async (req, res) => {
  try {
    const statePromise = State.find()
    const cityPromise = City.find().populate({
      path: 'state_id',
    })
    const subjectPromise = Subject.find()
    const datePromise = Date.find()
    const timePromise = Time.find().populate({
      path: 'date_id',
    })
    const [state, city, subject, date, time] = await Promise.all([
      statePromise,
      cityPromise,
      subjectPromise,
      datePromise,
      timePromise,
    ])
    console.log(city, time)

    res.status(201).json({ success: true, state, city, subject, date, time })
  } catch (error) {
    console.log(error.message)
  }
}
const addData = async (req, res) => {
  try {
    const stateData = { state: req.body.state }
    const dateData = { date: req.body.date }
    const subjectData = { subject: req.body.subject }

    const statePromise = State.create(stateData)
    const datePromise = Date.create(dateData)
    const subjectPromise = Subject.create(subjectData)

    // Execute multiple async create queries concurrently using Promise.all
    const [state, date, subject] = await Promise.all([
      statePromise,
      datePromise,
      subjectPromise,
    ])

    const cityData = { city: req.body.city, state_id: state._id }
    const timeData = { time: req.body.time, date_id: date._id }

    const cityPromise = City.create(cityData)
    const timePromise = Time.create(timeData)

    // Use Promise.all to wait for all create queries to complete
    const [city, time] = await Promise.all([cityPromise, timePromise])
    res.status(201).json({ success: true, message: 'Added Successfully' })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  //   console.log(req.body)
  try {
    if (email == 'admin@gmail.com' && password == 'test') {
      const token = createWebToken(123456)
      console.log(token)
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

      res.status(201).json({ success: true, message: 'logged in' })
    } else {
      console.log('in else')
      return res
        .status(401)
        .json({ success: false, error: 'Wrong email or Password' })
    }
  } catch (err) {
    console.log('in')
    console.log(err.message)
  }
}
const logoutUser = async (req, res) => {
  res.cookie('jwt', 'cookieExpired', { httpOnly: true, maxAge: 1000 })
  res.json({ success: true, message: 'user successfully logged out' })
}
module.exports = { loginUser, getCandidates, deleteCandidate, addData, getData }
