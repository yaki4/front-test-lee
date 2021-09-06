const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  type_id: {
    type: Schema.Types.ObjectId,
    ref: 'Type'
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
const User = mongoose.model('User', userSchema)
module.exports = User
