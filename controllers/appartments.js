const Appartment = require("../models/appartment")
const Image = require("../models/Image")

async function index(req, res) {
  try {
    const appartments = await Appartment.find({}).populate("image")
    res.render("appartments/index", { title: "All Appartments", appartments })
  } catch (error) {
    console.error("Error fetching appartments:", error)
  }
}

async function show(req, res) {
  try {
    const appartment = await Appartment.findById(req.params.id).populate(
      "image"
    )
    if (!appartment) {
      return res.status(404).send("Apartment not found")
    }
    res.render("appartments/show", { title: "Appartment Detail", appartment })
  } catch (error) {
    console.error("Error fetching apartment details:", error)
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
    appartment.furnished = req.body.furnished === "true"
    appartment.parking = req.body.parking === "on"

    if (req.file) {
      const image = new Image({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
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
  } catch (error) {
    console.error("Error creating appartment", error)
  }
}

async function findAppartment(req, res) {
  try {
    const searchQuery = req.query.search.toUpperCase()
    let appartments
    if (searchQuery) {
      appartments = await Appartment.find({ name: { $regex: searchQuery } })
    } else {
      appartments = await Appartment.find()
    }
    res.render("appartments/index.ejs", { appartments: appartments })
  } catch (error) {
    console.error("Error searching appartments:", error)
  }
}
async function deleteAppartment(req, res) {
  const appartment = await Appartment.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  })

  res.redirect("/appartments")
}

const editAppartment = async (req, res) => {
  console.log(req.params.id)
  const appartment = await Appartment.findById(req.params.id)
  console.log(appartment)
  res.render("appartments/edit", {
    appartment,
  })
}

const update = async (req, res) => {
  const appartmentId = req.params.id
  const updatedappartment = req.body
  console.log(updatedappartment)
  await Appartment.findByIdAndUpdate(appartmentId, updatedappartment)
  res.redirect(`/appartments/${appartmentId}`)
}

module.exports = {
  index,
  show,
  new: newAppartment,
  create,
  delete: deleteAppartment,
  edit: editAppartment,
  update,
  findAppartment,
}
