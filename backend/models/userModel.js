module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define(
		"Users",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING(50),
				unique: true,
				allowNull: false,
				validate: {
					isEmail: { msg: "L'email doit être valide !" },
					isLowercase: { msg: "L'email doit être en minuscule" },
				},
			},
			firstName: {
				type: DataTypes.STRING(20),
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
				type: DataTypes.STRING(20),
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
				allowNull: false,
			},
			bio: {
				type: DataTypes.TEXT,
				validate: {
					len: [5, 200],
					is: /^[a-zA-Z0-9]+$/i,
				},
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: 0,
			},
		},
		{
			tableName: "Users",
		},
		{
			classMethods: {
				associate: function (models) {
					// associations can be defined here
					models.Users.hasMany(models.Messages);
				},
			},
		},
	);
	return Users;
};
