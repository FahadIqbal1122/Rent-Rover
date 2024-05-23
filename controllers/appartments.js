const Appartment = require("../models/appartment")

async function index(req, res) {
  const appartments = await Movie.find({})
  res.render("appartments/index", { title: "All Appartments", movies })
}

async function show(req, res) {
  const appartment = await Appartment.findById(req.params.id)
  res.render("appartments/show", { title: "Appartment Detail", appartment })
}

function newAppartment(req, res) {
  res.render("appartments/new", { title: "Add Appartment", errorMsg: "" })
}

async function create(req, res) {
  try {
    res.redirect("/appartments")
  } catch (err) {
    console.log(err)
    res.render("appartments/new", { errorMsg: err.message })
  }
}

module.exports = {
  index,
  show,
  new: newAppartment,
  create,
}
