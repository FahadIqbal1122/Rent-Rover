const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer,
})

module.exports = mongoose.model("Image", imageSchema)
