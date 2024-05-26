const Appartment = require("../models/appartment")

async function create(req, res) {
  try {
    const appartment = await Appartment.findById(req.params.id)
    appartment.reviews.push(req.body)
    const updatedAppartment = await appartment.save()
    res.redirect(`/appartments/${updatedAppartment._id}`)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
}
async function deleteReview(req, res) {
  const appartment = await Appartment.findOne({
    "reviews._id": req.params.id,
    "reviews.user": req.user._id,
  })
  if (!appartment) return res.redirect("/appartments")
  appartment.reviews.remove(req.params.id)
  await appartment.save()
  res.redirect(`/appartments/${appartment._id}`)
}

module.exports = {
  create,
  delete: deleteReview,
}
