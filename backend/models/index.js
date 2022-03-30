const dbConfig = require("../config/dbConfig");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.userModel = require("./userModel")(sequelize, Sequelize);
db.postModel = require("./postModel")(sequelize, Sequelize)
module.exports = db;
