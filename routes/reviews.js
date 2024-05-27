const express = require("express")
const router = express.Router()
const reviewsCtrl = require("../controllers/reviews")
const ensureLoggedIn = require("../config/ensureLoggedIn")

router.post("/appartments/:id/reviews", ensureLoggedIn, reviewsCtrl.create)

router.get(
  "/appartments/:id/reviews/:reviewId/edit",
  ensureLoggedIn,
  reviewsCtrl.edit
)

router.post(
  "/appartments/:id/reviews/:reviewId/update",
  ensureLoggedIn,
  reviewsCtrl.update
)
router.delete("/reviews/:id", ensureLoggedIn, reviewsCtrl.delete)

module.exports = router
