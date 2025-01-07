require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("./config/database");
const User = require("./models/User");
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();

app.use(express.json());

sequelize
    .sync({force: true})
    .then(() => {
        console.log("Database synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });

const generateToken = (username) => {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
};

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        const token = generateToken(username);
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.get("/protected", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    res.json({ message: `Hello, ${user.username}` });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
