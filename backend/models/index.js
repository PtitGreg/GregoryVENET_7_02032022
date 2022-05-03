// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const fs = require("fs");
const path = require("path");
const dbConfig = require("../config/dbConfig");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
});

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes,
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./userModel")(sequelize, Sequelize);
db.post = require("./postModel")(sequelize, Sequelize);
db.comment = require("./commentModel")(sequelize, Sequelize);

db.user.hasMany(db.post, { onDelete: "cascade" });
db.user.hasMany(db.comment, { onDelete: "cascade" });
db.post.hasMany(db.comment, { onDelete: "cascade" });
db.post.belongsTo(db.user);
db.comment.belongsTo(db.post);
db.comment.belongsTo(db.user);

module.exports = db;
