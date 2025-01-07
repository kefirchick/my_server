const jwt = require("jsonwebtoken");

function protected(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    res.json({ message: `Hello, ${user.username}` });
};

module.exports = { protected };