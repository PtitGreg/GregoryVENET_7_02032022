module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: { msg: "L'email doit être valide !" },
					isLowercase: { msg: "L'email doit être en minuscule" },
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: {
						msg: "Merci d'insérer un nom contenant uniquement des lettres comprises 2 et 20, sans espace ! ",
					},
					len: [2, 20],
					notIn: " ",
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: {
						msg: "Merci d'insérer un prénom contenant uniquement des lettres comprises 2 et 20, sans espace ! ",
					},
					len: [2, 20],
					notIn: " ",
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			avatar: {
				type: DataTypes.STRING,
			},
			bio: {
				type: DataTypes.TEXT,
				// validate: {
				// 	len: [5, 200],
				// 	is: /^[a-z]+$/i,
				// },
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: 0,
			},
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
