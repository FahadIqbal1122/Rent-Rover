const express = require('express')
const router = express.Router()
const reviewsCtrl = require('../controllers/reviews')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.post('/appartments/:id/reviews', ensureLoggedIn, reviewsCtrl.create)

router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete)

router.get('/:id', ensureLoggedIn, reviewsCtrl.updateReview)
module.exports = router
