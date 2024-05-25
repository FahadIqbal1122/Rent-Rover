const mongoose = require("mongoose")

const Schema = mongoose.Schema
const reviewSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
)
const appartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  rooms: {
    type: Number,
  },
  view: {
    type: String,
    enum: ["seaView", "gardenView", "pentHouse", "normalView"],
  },
  parking: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
  },
  services: {
    type: String,
  },
  email: {
    type: String,
  },
  reviews: [reviewSchema],
  image: {
    type: String,
  },
})
module.exports = mongoose.model("Appartment", appartmentSchema)
