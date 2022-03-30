const db = require("../models");
const userModel = db.userModel;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
	    const { username, email, password } = req.body
    try{
        const user = await userModel.create({username, email, password});
        return res.json(user);
    }catch(err){
        return res.status(500).json(err);
    }
};
exports.login = (req, res) => {
	exports.login = (req, res) => {
		userModel.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					return res.status(401).json({ error });
				}
				bcrypt
					.compare(req.body.password, user.password)
					.then((valid) => {
						if (!valid) {
							return res.status(401).json({ error });
						}
						res.status(200).json({
							userId: user._id,
							token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
								expiresIn: "24h",
							}),
							message: "Utilisateur connecté avec succès !",
						});
					})
					.catch((error) => res.status(500).json({ error }));
			})
			.catch((error) => res.status(500).json({ error }));
	};

};
exports.logout = (req, res) => {

};
exports.getAllUsers = (req, res, next) => {
	userModel.findAll({ attributes: ["id", "username", "email"] })
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json(error));
};

module.exports.findOne = async (req, res) => {
	const id = req.params.id;
	await userModel.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Ne peut pas trouver l'utilisateur avec l'id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"erreur lors de la récupération de l'utilisateur avec l'id=" + id,
			});
		});
};

exports.roleUser = (req, res) => {};

exports.updateUser = async (req, res) => {
	const id = req.params.id;
	await userModel.update(req.body, {
		where: { id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Utilisateur mis à jour avec succès !",
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour l'utilisateur avec l'id=${id} !`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur mise à jour utilisateur à l'id=" + id,
			});
		});
};

exports.deleteUser = async (req, res) => {
	const id = req.params.id;
	try {
		const user = await userModel.findOne({
			where: { id },
		});
		await user.destroy();
		return res.json({ message: "Utilisateur supprimé !" });
	} catch (err) {
		return res.status(500).json({ err: "Erreur lors de la suppression !" });
	}
};
