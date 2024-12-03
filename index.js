const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("./config/database");
const User = require("./models/User");

const PORT = 3000;
const SECRET_KEY = "secret_key_for_test";

const app = express();

app.use(express.json());

app.use("/pub", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});

sequelize
    .sync()
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
    const user = jwt.verify(token, SECRET_KEY);
    res.json({ message: `Hello, ${user.username}` });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
