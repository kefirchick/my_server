const express = require("express");
const { register } = require("./handlers/register");
const { login } = require("./handlers/login")
const { protected } = require("./handlers/protected")

const router = express.Router();

console.log(register, login, protected)
router.post("/register", register);
router.post("/login", login);
router.post("/protected", protected);

module.exports = router;