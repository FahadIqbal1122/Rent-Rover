const Appartment = require('../models/appartment')

module.exports = {
  create,
  delete: deleteReview
}
async function create(req, res) {
  const appartment = await Appartment.findById(req.params.id)
  req.body.user = req.user._id
  req.body.userName = req.user.name
  req.body.userAvatar = req.user.avatar

  appartment.reviews.push(req.body)
  try {
    await appartment.save()
    // const updatedAppartment = await appartment.save()
    // res.redirect(`/appartments/${updatedAppartment._id}`)
  } catch (err) {
    console.log(err)
    // res.status(500).send(err.message)
  }
  res.redirect(`/appartments/${appartment._id}`)
}
async function deleteReview(req, res) {
  const appartment = await Appartment.findOne({
    'reviews._id': req.params.id,
    'reviews.user': req.user._id
  })
  if (!appartment) return res.redirect('/appartments')
  appartment.reviews.remove(req.params.id)
  await appartment.save()
  res.redirect(`/appartments/${appartment._id}`)
}
//aaaaaaaaaaaaaasasasasasasasasasasasasasasasasasasasasasassasasasasa
