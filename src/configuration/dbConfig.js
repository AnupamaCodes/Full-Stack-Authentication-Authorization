const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/jwt")
  .then(() => {
    console.log("Mongodb is Connected");
  })
  .catch(() => {
    console.log("Error occured");
  });
module.exports = mongoose;
