require("dotenv").config()
require("./config/database")

const Appartment = require("./models/appartment")

const createAppartment = async () => {
  try {
    const doc = await Appartment.create({
      name: " prestigePines",
      furnished: available,
      rooms: 5,
      View: available,
      parking: available,
      price: $100,
      services: houseKeeping,
      email: lisa123.com,
      reviews: nice,
    })

    console.log("Done creating appartment", doc)
  } catch (err) {
    console.error(err)
  }
}

// Call the async function
createAppartment()
