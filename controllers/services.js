const Service = require("../models/service")
const Appartment = require("../models/appartment")

async function addToAppartment(req, res) {
  try {
    const appartment = await Appartment.findById(req.params.id)
    appartment.appartmentServices.push(req.body.ServiceId)
    await appartment.save()
    res.redirect(`/appartments/${appartment._id}`)
  } catch (error) {
    console.log(error)
    res.redirect("/planets")
  }
}

module.exports = {
  addToAppartment,
}
