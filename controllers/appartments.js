const appartment = require("../models/appartment")
const Appartment = require("../models/appartment")
const Image = require("../models/Image")

async function index(req, res) {
  const appartments = await Appartment.find({})
  res.render("appartments/index", { title: "All Appartments", appartments })
}

// async function show(req, res) {
//   const appartment = await Appartment.findById(req.params.id).populate("image")
//   console.log(`Apartment ${JSON.stringify(apartment, null, 2)}`)
//   res.render("appartments/show", { title: "Appartment Detail", appartment })
// }

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
    if (req.file) {
      const image = new Image({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
      })
      try {
        const savedImage = await image.save()
        appartment.image = savedImage._id
      } catch (error) {
        console.error("Error saving image:", error)
      }
    }

    appartment.user = req.user._id
    appartment.userName = req.user.name
    appartment.userAvatar = req.user.avatar
    const newAppartment = await appartment.save()
    console.log(newAppartment)
    res.redirect(`/appartments/${newAppartment._id}`)
  } catch (err) {
    console.log(err)
    res.render("appartments/new", { errorMsg: err.message })
  }
}

async function deleteAppartment(req, res) {
  if (!Appartment.user === req.user._id) {
    return res
      .status(403)
      .send("You are not authorized to delete this appartment")
  } else {
    await Appartment.findByIdAndDelete(req.params.id)
    res.redirect("/appartments")
  }
}

// credit regex: https://stackoverflow.com/questions/39614608/search-query-in-mongodb-using-regular-expression
async function findAppartment(req, res) {
  try {
    const searchQuery = req.query.search.toUpperCase()
    let appartments

    if (searchQuery) {
      appartments = await Appartment.find({
        name: { $regex: searchQuery },
      })
    } else {
      appartments = await Appartment.find()
    }

    // Render the search results on the index page
    res.render("appartments/index.ejs", { appartments: appartments })
  } catch (error) {
    console.error("Error searching appartments:", error)
    if (error.name === "MongoError") {
      res.status(500).send("Database error occurred.")
    } else {
      res.status(500).send("Error searching appartments.")
    }
  }
}

async function index(req, res) {
  const appartments = await Appartment.find({})
  res.render("appartments/index", { title: "All Appartments", appartments })
}

async function show(req, res) {
  try {
    const appartment = await Appartment.findById(req.params.id).populate(
      "image"
    )
    console.log(`Apartment ${JSON.stringify(appartment, null, 2)}`)

    if (!appartment) {
      return res.status(404).send("Apartment not found")
    }
    res.render("appartments/show", { title: "Appartment Detail", appartment })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error fetching apartment details")
  }
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
    if (req.file) {
      const image = new Image({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      })

      const savedImage = await image.save()
      appartment.image = savedImage._id
    }
    appartment.user = req.user._id
    appartment.userName = req.user.name
    appartment.userAvatar = req.user.avatar
    const newAppartment = await appartment.save()
    console.log(newAppartment)
    res.redirect(`/appartments/${newAppartment._id}`)
  } catch (err) {
    console.log(err)
    res.render("appartments/new", { errorMsg: err.message })
  }
}

async function deleteAppartment(req, res) {
  const appartment = await Appartment.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  })

  res.redirect(`/appartments`)
}

module.exports = {
  index,
  show,
  new: newAppartment,
  create,
  delete: deleteAppartment,
  findAppartment,
}
