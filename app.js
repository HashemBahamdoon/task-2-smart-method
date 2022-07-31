const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//set up the mongoose DB(1)
const mongoose = require("mongoose");
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//set up the mongoose DB(2)
main().catch((err) => console.log(err));
//set up the mongoose DB(3)
async function main() {
  await mongoose.connect("mongodb://localhost:27017/sensorsDB");
}
//creating schema
const dataSchema = new mongoose.Schema({ sensorsValue: Number });
//creating model
const DataV = new mongoose.model("Data", dataSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const sensorsValue = req.body.data;
  const value = new DataV({ sensorsValue: sensorsValue });

  value.save();
  res.redirect("/db");
});


 

app.get("/db", function (req, res) {
  DataV.find({}, function (err, foundData) {
    if (!err) {
      res.render("db", { data: foundData });
    }
  });
});

app.listen(3000, function () {
  console.log("listing to port 3000");
});
