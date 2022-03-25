const express = require("express");
const path = require("path");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
require("dotenv").config({ path: "./utils/.env" });
require("./config/database");
const cookieParser = require("cookie-parser");

const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

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

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
