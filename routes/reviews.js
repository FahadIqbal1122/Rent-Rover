const express = require('express')
const router = express.Router()
const reviewsCtrl = require('../controllers/reviews')
const ensureLoggedIn = require('../config/ensureLoggedIn')

// POST /appartments/:id/reviews (create review for a movie)
router.post('/appartments/:id/reviews', ensureLoggedIn, reviewsCtrl.create)

router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete)

module.exports = router
