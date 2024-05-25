const express = require("express")
const router = express.Router()
// var Appartment = require("../models/appartment")
// //INDEX - show all  appartments
// router.get("/", function (req, res) {
//   var noMatch = null
//   if (req.query.search) {
//     const regex = new RegExp(escapeRegex(req.query.search), "gi")
//     // Get all appartments from DB
//     Appartment.find({ name: regex }, function (err, allAppartments) {
//       if (err) {
//         console.log(err)
//       } else {
//         if (allAppartments.length < 1) {
//           noMatch = "No campgrounds match that query, please try again."
//         }
//         res.render("appartments/index", {
//           campgrounds: allAppartments,
//           noMatch: noMatch,
//         })
//       }
//     })
//   } else {
//     // Get all campgrounds from DB
//     Appartment.find({}, function (err, allAppartments) {
//       if (err) {
//         console.log(err)
//       } else {
//         res.render("appartmentys/index", {
//           campgrounds: allCampgrounds,
//           noMatch: noMatch,
//         })
//       }
//     })
//   }
// })
const appartmentCtrl = require("../controllers/appartments")
// const appartments = require("../controllers/appartments")

router.get("/new", appartmentCtrl.new)
router.post("/", appartmentCtrl.create)
router.get("/", appartmentCtrl.index)
router.get("/:id", appartmentCtrl.show)

// writing as a decoration
// has a function regex which passes in text argument which is  going to be query
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  // returns that text and replace with regular expression(match any expression gobally)
}

module.exports = router
