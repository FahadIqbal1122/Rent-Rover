const User = require("../models/user")
const Appartment = require("../models/appartment")

async function index(req, res) {
  try {
    const appartments = await Appartment.find({ user: req.user._id })

    res.render("users/index", { title: "Your Apartments", appartments })
  } catch (error) {
    console.error("Error fetching user's apartments:", error)
    res.status(500).send("Error fetching user's apartments.")
  }
}

module.exports = {
  index,
}
