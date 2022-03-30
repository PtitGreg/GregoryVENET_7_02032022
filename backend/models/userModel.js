"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			email:{
				type:DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate:{
					isEmail: {msg: "It must be a valid Email address"},
				}
			},
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			bio: DataTypes.STRING,
			isAdmin: DataTypes.BOOLEAN,
		},
		{
			classMethods: {
				associate: function (models) {
					// associations can be defined here
					models.User.hasMany(models.Message);
				},
			},
		},
	);
	return User;
};

