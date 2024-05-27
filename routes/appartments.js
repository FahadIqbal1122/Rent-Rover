const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')

// Credit for multer = https://www.npmjs.com/package/multer
const multer = require('multer')
const appartment = require('../models/appartment')
const appartmentCtrl = require('../controllers/appartments')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.get('/new', appartmentCtrl.new)

router.post('/', upload.single('image'), ensureLoggedIn, appartmentCtrl.create)
router.delete('/:id', ensureLoggedIn, appartmentCtrl.delete)
router.get('/', appartmentCtrl.index)
router.get('/:id', appartmentCtrl.show)
module.exports = router
