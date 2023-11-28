require("dotenv").config();
const mongoose = require("mongoose");

const database = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = database;
