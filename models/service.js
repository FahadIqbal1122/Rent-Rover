const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model("Service", ServiceSchema)
