// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const express = require("express");
const path = require("path");
const app = express();
const db = require("./models");

const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
const commentRoutes = require("./routes/commentRoute");

require("dotenv").config("./.env");

const helmet = require("helmet");

db.sequelize.sync({ force: false }).then(() => {
	console.log("Database Groupomania resynchronisée !");
});

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS",
	);
	next();
});

app.use(
	helmet({
		crossOriginResourcePolicy: false,
	}),
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

module.exports = app;
