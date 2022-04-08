// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define("Users", {
		email: {
			type: DataTypes.STRING(50),
			unique: true,
			allowNull: false,
			validate: {
				isEmail: { msg: "L'email doit être valide !" },
				isLowercase: { msg: "L'email doit être en minuscule !" },
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
		media: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		bio: {
			type: DataTypes.STRING(200),
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
			allowNull: false,
		},
	});
	return Users;
};
