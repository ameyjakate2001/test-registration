const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  state_id: {
    type: objectId,
    ref: 'State',
  },
  city_id: {
    type: objectId,
    ref: 'City',
  },
  subject_id: {
    type: objectId,
    ref: 'Subject',
  },
  date_id: {
    type: objectId,
    ref: 'Date',
  },
  time_id: { type: objectId, ref: 'Time' },
})

const Candidate = mongoose.model('User', candidateSchema)

module.exports = Candidate
