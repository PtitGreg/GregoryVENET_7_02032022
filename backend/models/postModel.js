// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

module.exports = (sequelize, DataTypes) => {
	const Messages = sequelize.define("messages", {
		content: {
			type: DataTypes.STRING(200),
		},
		media: {
			type: DataTypes.STRING(200),
		},
		like: {
			type: DataTypes.INTEGER(1),
			defaultValue: 0,
			allowNull: false,
		},
	});
	return Messages;
};
