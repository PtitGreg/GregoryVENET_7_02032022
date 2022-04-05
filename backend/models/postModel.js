module.exports = (sequelize, DataTypes) => {
	const Messages = sequelize.define(
		"Messages",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "users",
					key: "id",
				},
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: {
						msg: "Merci d'insérer un titre contenant uniquement des lettres comprises 2 et 20, sans espace ! ",
					},
				},
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
				allowNull: false,
			},
			unlike: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
			}
		},
		{
			tableName: "Messages",
		},
		{
			classMethods: {
				associate: function (models) {
					// associations can be defined here
					models.Messages.belongsTo(models.Users, {
						foreignKey: {
							allowNull: false,
						},
						onDelete: "CASCADE",
					});
				},
			},
		},
	);
	return Messages;
};
