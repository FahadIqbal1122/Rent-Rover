const express = require("express")
const router = express.Router()
// Credit for multer = https://www.npmjs.com/package/multer
const multer = require("multer")
const appartmentCtrl = require("../controllers/appartments")
const appartment = require("../models/appartment")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})
const upload = multer({ storage: storage })

router.get("/new", appartmentCtrl.new)

router.post("/", upload.single("image"), appartmentCtrl.create)
router.delete("/:id", appartmentCtrl.delete)

router.get("/", appartmentCtrl.index)
router.get("/:id", appartmentCtrl.show)

// writing as a decoration
// has a function regex which passes in text argument which is  going to be query
// function escapeRegex(text) {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
//   // returns that text and replace with regular expression(match any expression gobally)
// }

module.exports = router
