var express = require("express")
var router = express.Router()

const ensureLoggedIn = require("../config/ensureLoggedIn")
const userCtrl = require("../controllers/users")

router.get("/", userCtrl.index, ensureLoggedIn)

module.exports = router
