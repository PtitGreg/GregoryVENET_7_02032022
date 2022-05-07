// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const db = require("../models");
const commentModel = db.comment;

module.exports = (req, res, next) => {
	try {
		commentModel
		.findOne({
			where: { id: req.params.id },
		})
		.then((comment) => {
			console.log('comment: ', comment);
			console.log('commentModel: ', commentModel);
			console.log('req.params.id: ', req.params.id);
			if (comment.UserId === req.token.userId) {
				next();
				console.log('req: ', req);
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
