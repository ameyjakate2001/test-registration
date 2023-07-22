const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
  city: {
    type: String,
  },
  state_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
  },
})

const City = mongoose.model('City', citySchema)

module.exports = City
