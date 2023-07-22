const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema({
  date: {
    type: String,
  },
})

const Date = mongoose.model('Date', dateSchema)

module.exports = Date
