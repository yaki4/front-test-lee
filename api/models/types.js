const mongoose = require('mongoose')
const Schema = mongoose.Schema
const typeSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
})
const Type = mongoose.model('Type', typeSchema)
module.exports = Type
