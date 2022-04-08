// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const db = require("../models");
const userModel = db.user;

module.exports = (req, res, next) => {
	try {
		userModel
			.findOne({
				where: { id: req.params.id },
			})
			.then((user) => {
				if (user.id === req.token.userId || user.isAdmin ) next();
				else {
					return res
						.status(403)
						.json({ message: "Vous n'êtes pas le propriétaire !" });
				}
			})
			.catch((err) =>
				res.status(403).json({ message: "Vous n'êtes pas le propriétaire ou utilisateur inexistant!"}),
			);
	}
	catch (error) {
		res.status(403).json({ error });
	}
};
