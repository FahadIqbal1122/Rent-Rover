const express = require("express")
const router = express.Router()

const appartmentCtrl = require("../controllers/appartments")

router.get("/new", appartmentCtrl.new)
router.post("/", appartmentCtrl.create)
router.delete('/:id', appartmentCtrl.delete);
router.get("/", appartmentCtrl.index)
router.get("/:id", appartmentCtrl.show)

module.exports = router
