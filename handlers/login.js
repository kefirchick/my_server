const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (username) => {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
};

async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        const token = generateToken(username);
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

module.exports = { login };