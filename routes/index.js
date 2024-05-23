var express = require('express')
var router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Rent Rover' })
})

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/appartments',
    failureRedirect: '/appartments'
  })
)
// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/appartments')
  })
})

module.exports = router
