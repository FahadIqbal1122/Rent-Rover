const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: String,
    contact: Number,
    email: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
