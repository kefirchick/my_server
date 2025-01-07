const User = require("../models/User");
const bcrypt = require("bcrypt");

async function register(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.json({ message: "User registered" });
};

module.exports = { register };