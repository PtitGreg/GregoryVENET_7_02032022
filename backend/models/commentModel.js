// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define(
		"Comments",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				notNull: true,
				autoIncrement: true,
			},
			content: {
				type: DataTypes.STRING,
				validate: {
					max: 200,
				},
			},
			media: {
				type: DataTypes.STRING,
			},
			like: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				notNull: true,
			},
			unlike: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				notNull: true,
			},
		},
	);
	return Comments;
};
