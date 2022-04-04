const postModel = require("../models/postModel");

module.exports = (req, res, next) => {
	try {
		console.log(userModel);
		userModel.findOne({
			where: {id: req.params.id}

		}).then((user) => {
			console.log('user: ', user);
			if (user.userId === req.token.id) next();
			else {
				return res
					.status(403)
					.json({ message: "Vous n'êtes pas le propriétaire" });
			}
		});
	} catch (error) {
		res.status(403).json({ error });
	}
};
