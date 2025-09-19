// imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const auth = require("./config");

// initialise express app
const app = express();

// convert data to json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// connect to MongoDB
const dbURI =
  "mongodb+srv://koimettb:1738@nodejstuts.rmg3aqa.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodejstuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(5000) && console.log("connection successful !")) // only listen if connection is made
  .then(console.log("Server is running on http://localhost:3000"))
  .catch((err) => console.log(err));

// use EJS as view engine
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

// route handlers - define route
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const auths = new auth({
    name: req.body.username,
    password: req.body.password,
  });

  const existingUser = await auth.findOne({ name: auths.name });
  if (existingUser) {
    return res.render("signup", {
      error: "User already exists. Please choose a different username.",
    });
  }

  try {
    const result = await auths.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.render("signup", {
      error: "Error creating user. Please try again.",
    });
  }
});

// Start the server
// const port = 5000
// app.listen(port, () => {
//     console.log('Server is running on http://localhost:3000');
// })
