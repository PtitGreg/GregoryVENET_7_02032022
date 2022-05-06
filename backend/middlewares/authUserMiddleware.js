// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const jwt = require("jsonwebtoken");
const model = require("../models/index");

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		req.token = jwt.verify(token, process.env.TOKEN_KEY);
		req.auth = req.token.userId;
		const user = await model.user.findOne({
			where: {
				id: req.token.userId,
			},
		});
		if (!user) {
			return res.status(401).json({ message: "L'utilisateur n'existe pas !" });
		} else if (req.body.userId && req.body.userId !== req.token.userId) {
			throw "Id utilisateur non valable";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: "Requête non authentifiée" });
	}
};
