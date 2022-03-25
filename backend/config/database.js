const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.USER_NAME,
	process.env.PASSWORD,
	{
		host: "localhost",
		dialect: "mysql",
	},
);

const test = async () => {
	try {
		await sequelize.authenticate();

		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

test();
