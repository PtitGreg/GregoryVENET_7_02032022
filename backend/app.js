const express = require("express");
const path = require("path");

const app = express();

const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
const db = require("./models");

require("dotenv").config("./.env");

const cookieParser = require("cookie-parser");

const helmet = require("helmet");


// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync db.");
// });

app.use(express.json())

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


app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
