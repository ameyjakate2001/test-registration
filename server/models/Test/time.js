const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
  time: {
    type: String,
  },
  date_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Date',
  },
})

const Time = mongoose.model('Time', timeSchema)

module.exports = Time
