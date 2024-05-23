const Appartment = require("../models/appartment")

module.exports = {
  create,
}

async function create(req, res) {
  try {
    const appartment = await Appartment.findById(req.params.id)
    Appartment.reviews.push(req.body)
    const updatedAppartment = await appartment.save()
    res.redirect(`/appartments/${updatedAppartment._id}`)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
}
