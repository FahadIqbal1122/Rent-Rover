const express = require("express")
const router = express.Router()
const ensureLoggedIn = require("../config/ensureLoggedIn")

// Credit for multer = https://www.npmjs.com/package/multer
const multer = require("multer")
const appartmentCtrl = require("../controllers/appartments")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

router.get("/", appartmentCtrl.index)
router.get("/find", appartmentCtrl.findAppartment)
router.get("/new", appartmentCtrl.new)
router.get("/:id", appartmentCtrl.show)
router.get("/:id/edit", appartmentCtrl.edit)
router.post("/edit/:id", appartmentCtrl.update)

router.post("/", upload.single("image"), ensureLoggedIn, appartmentCtrl.create)
router.delete("/:id", ensureLoggedIn, appartmentCtrl.delete)

module.exports = router
