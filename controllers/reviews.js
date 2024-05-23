const Appartment = require("../models/appartment")

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
async function deleteReview(req, res) {
  const movie = await Movie.findOne({
    "reviews._id": req.params.id,
    "reviews.user": req.user._id,
  })
  if (!movie) return res.redirect("/movies")
  movie.reviews.remove(req.params.id)
  await movie.save()
  res.redirect(`/movies/${movie._id}`)
}

module.exports = {
  create,
  delete: deleteReview,
}
