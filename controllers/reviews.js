const Appartment = require("../models/appartment")

module.exports = {
  create,
  delete: deleteReview,
  update,
  edit,
}
async function create(req, res) {
  const appartment = await Appartment.findById(req.params.id)
  req.body.user = req.user._id
  req.body.userName = req.user.name
  req.body.userAvatar = req.user.avatar

  appartment.reviews.push(req.body)
  try {
    await appartment.save()
  } catch (err) {
    console.log(err)
  }
  res.redirect(`/appartments/${appartment._id}`)
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

async function edit(req, res) {
  try {
    const appartmentId = req.params.id
    const reviewId = req.params.reviewId

    const appartment = await Appartment.findById(appartmentId)
    if (!appartment) {
      return res.status(404).send("Apartment not found")
    }

    const review = appartment.reviews.id(reviewId)
    if (!review) {
      return res.status(404).send("Review not found")
    }

    res.render("appartments/editReview", { appartment, review })
  } catch (error) {
    console.error("Error editing review:", error)
    res.status(500).send("Error editing review")
  }
}

async function update(req, res) {
  try {
    const appartment = await Appartment.findById(req.params.id)
    if (!appartment) {
      return res.status(404).send("Apartment not found")
    }

    const reviewId = req.params.reviewId
    const updatedReview = {
      content: req.body.content,
      rating: req.body.rating,
    }

    const reviewToUpdate = appartment.reviews.id(reviewId)
    if (!reviewToUpdate) {
      return res.status(404).send("Review not found")
    }

    reviewToUpdate.set(updatedReview)
    await appartment.save()

    res.redirect(`/appartments/${appartment._id}`)
  } catch (err) {
    console.error("Error updating review:", err)
    res.status(500).send("Error updating review.")
  }
}
