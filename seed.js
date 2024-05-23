require("dotenv").config() // Necessary if connection string is in a .env file
require("./config/database") // Execute the code to connect to the db

const Appartment = require("./models/appartment")

// Define an async function to create the movie in the database
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

      // cast: ["Mark Hamill", "Carrie Fisher", "Harrison Ford"],
      // nowShowing: true,
    })

    console.log("Done creating appartment", doc)
  } catch (err) {
    console.error(err)
  }
}

// Call the async function
createAppartment()
