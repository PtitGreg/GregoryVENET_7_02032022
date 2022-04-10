// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		req.token = jwt.verify(token, process.env.TOKEN_KEY);
		if (isAdmin !== true) {
			throw "Vous n'avez pas les droits requis !";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({
			error,
		});
	}
};
