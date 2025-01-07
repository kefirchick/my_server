require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/User");
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const router = require("./router");

const app = express();

app.use(express.json());
app.use("/api", router);

sequelize
    .sync({force: true})
    .then(() => {
        console.log("Database synced successfully");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error starting server", error);
    });