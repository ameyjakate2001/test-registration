const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
  state: {
    type: String,
  },
})

const State = mongoose.model('State', stateSchema)

module.exports = State
