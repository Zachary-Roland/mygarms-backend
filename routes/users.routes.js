const express = require("express");
const router = express.Router();
const { login, signup } = require("../models/users.models");

// ? What routes do I want for users?
// TODO Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Use bcrypt .compare function to compare password provided to saved pasword
  if (validate(username, password)) {
    return login(res, username, password);
  }
  return res
    .send
    // Fail object in parens
    ();
});

// TODO Signup route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (validate(username, password)) {
    return signup(res, username, password);
  }
  return res
    .send
    // Fail object in parens
    ();
});

// TODO

// ! validate function checks if meets length requirements
function validate(username, password) {
  return (
    username &&
    username.length >= 4 &&
    username.length <= 20 &&
    password &&
    password.length >= 4 &&
    password.length <= 20
  );
}

module.exports = router;
