require("dotenv").config()
require("./config/database")

const Appartment = require("./models/appartment")
const Service = require("./models/service")

const createAppartment = async () => {
  try {
    const doc = await Appartment.create({
      name: "House2",
      furnished: false,
      rooms: 3,
      view: "seaView",
      parking: true,
      price: 90,
      services: "houseKeeping",
      email: "hello123@gmail.com",
    })
    console.log("Done creating appartment", doc)
  } catch (err) {
    console.error("Error creating apartment:", err)
  }
}

const createService = async () => {
  try {
    const doc = await Service.create({
      name: "Internet",
      price: 90,
    })
    console.log("Done creating service", doc)
  } catch (error) {
    console.error("Error creating service:", err)
  }
}
// Call the async function
createService()
