const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = require("./handlers");

const PORT = 3000;
const SECRET_KEY = "secret_key_for_test";

const app = express();
const users = {};

app.use(express.json());

const generateToken = (username) => {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

// Register a new user
app.post('/register', register);

// Login a user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users[username]; // Look up the user

    const isValid = await bcrypt.compare(password, user.password); // Compare hashed passwords
    const token = generateToken(username); // Generate JWT
    res.json({ token }); // Send the token to the client
});

// Access a protected route
app.get('/protected', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header
    const user = jwt.verify(token, SECRET_KEY); // Verify the token
    res.json({ message: `Hello, ${user.username}` }); // Return a welcome message
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});