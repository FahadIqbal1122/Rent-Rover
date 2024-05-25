const Appartment = require("../models/appartment")

async function index(req, res) {
  const appartments = await Appartment.find({})
  res.render("appartments/index", { title: "All Appartments", appartments })
}

async function show(req, res) {
  const appartment = await Appartment.findById(req.params.id)
  res.render("appartments/show", { title: "Appartment Detail", appartment })
}

function newAppartment(req, res) {
  res.render("appartments/new", { title: "Add Appartment", errorMsg: "" })
}

async function create(req, res) {
  try {
    const appartment = new Appartment(req.body)
    if (appartment.name) {
      appartment.name = appartment.name.toUpperCase()
    }
    if (req.body.price) {
      appartment.price = appartment.price.toString()
    }
    if (req.body.furnished === "true") {
      appartment.furnished = true
    } else {
      appartment.furnished = false
    }
    if (req.body.parking === "on") {
      appartment.parking = true
    } else {
      appartment.parking = false
    }
    if (appartment.image) {
      appartment.image = req.file.image
    }
    const newAppartment = await appartment.save()
    console.log(newAppartment)
    res.redirect(`/appartments/${newAppartment._id}`)
  } catch (err) {
    console.log(err)
    res.render("appartments/new", { errorMsg: err.message })
  }
}

async function deleteAppartment(req, res) {
  if (!Appartment.user.equals(req.user._id)) {
    return res.status(403).send('You are not authorized to delete this apartment');
}
      await Appartment.findByIdAndDelete(req.params.id);
      res.redirect('/appartments'); 
    
}

module.exports = {
  index,
  show,
  new: newAppartment,
  create,
  delete: deleteAppartment,
}
