// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const db = require("../models");
const userModel = db.user;
const postModel = db.post;
const commentModel = db.comment;


module.exports = (req, res, next) => {
	try {
		userModel
			.findOne({
				where: { id: req.params.id },
			})
			.then((user) => {
				if (user.id === req.token.userId) {
					next();
				}
				else {
					return res
						.status(403)
						.json({ message: "Vous n'êtes pas le propriétaire !" });
				}
			})
			.catch((err) =>
				res
					.status(403)
					.json({
						message:
							"Vous n'êtes pas le propriétaire ou utilisateur inexistant!",
					}),
			);
	} catch (error) {
		res.status(403).json({ error });
	}
};

module.exports = (req, res, next) => {
	try {
		postModel
			.findOne({
				where: { id: req.params.id },
			})
			.then((post) => {
				if (post.UserId === req.token.userId) {
					next()
				}
				else {
					return res
						.status(403)
						.json({ message: "Vous n'êtes pas le propriétaire !" });
				}
			})
			.catch((err) =>
				res.status(403).json({
					message: "Vous n'êtes pas le propriétaire ou utilisateur inexistant!",
				}),
			);
	} catch (error) {
		res.status(403).json({ error });
	}
};

module.exports = (req, res, next) => {
	try {
		commentModel
			.findOne({
				where: { id: req.params.id },
			})
			.then((comment) => {
				console.log('comment: ', comment);
				if (comment.UserId === req.token.userId) {
					next();
				} else {
					return res
						.status(403)
						.json({ message: "Vous n'êtes pas le propriétaire !" });
				}
			})
			.catch((err) =>
				res.status(403).json({
					message: "Vous n'êtes pas le propriétaire ou utilisateur inexistant!",
				}),
			);
	} catch (error) {
		res.status(403).json({ error });
	}
};
