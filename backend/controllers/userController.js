const db = require("../models");
const userModel = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");
const fs = require("fs");

//Schema password
const schemaPassword = new passwordValidator();
schemaPassword
	.is()
	.min(8)
	.is()
	.max(100)
	.has()
	.uppercase()
	.has()
	.lowercase()
	.has()
	.not()
	.spaces()
	.has()
	.digits(2);
exports.signup = (req, res) => {
	if (schemaPassword.validate(req.body.password)) {
		bcrypt.hash(req.body.password, 10).then((hash) => {
			const reqBody = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hash,
				isAdmin: req.body.isAdmin,
				media: `${req.protocol}://${req.get("host")}/images/avatar.webp`,
			};
			userModel
				.create(reqBody)
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch((err) => {
					res.status(500).json({
						message: err.message,
					});
				});
		});
	} else {
		res.status(401).json({
			message:
				"Le mot de passe doit contenir 8 caractères, 1 majuscule, 1 minuscule et 2 chiffres minimum!",
		});
	}
};
exports.login = async (req, res) => {
	await userModel
		.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ error: "identifiant non valide ou inéxistant" });
			} else {
				bcrypt
					.compare(req.body.password, user.password)
					.then((valid) => {
						if (!valid) {
							return res.status(401).json({ error: "password non valide" });
						}
						res.status(200).json({
							id: user.id,
							username: user.username,
							token: jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, {
								expiresIn: "24h",
							}),
							message: "Utilisateur connecté avec succès !",
						});
					})
					.catch((error) => res.status(500).json({ error }));
			}
		})
		.catch((error) => res.status(500).json({ error }));
};
exports.getAllUsers = async (req, res, next) => {
	await userModel
		.findAll({ attributes: ["id", "firstName", "lastName", "email", "media"] })
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json(error));
};

exports.getOneUser = async (req, res) => {
	await userModel
		.findOne({where: {id : req.params.id}})
		.then((data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(404).json({
					message: `Utilisateur introuvable !`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message:
					"erreur lors de la récupération de l'utilisateur !", err,
			});
		});
};

exports.updateUser = async (req, res) => {
	await userModel
		.findOne({ where: { id: req.params.id } })
		.then((user) => {
			let dataBody = {
				...req.body,
			};
			if (req.file) {
				const img = user.media.split("/images/")[1];
				if (img !== "avatar.webp") {
					fs.unlinkSync("images/" + img, () => {});
				}
				dataBody = {
					...dataBody,
					media: `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`,
				};
			}
			userModel
				.update(
					{
						...dataBody,
					},
					{
						where: { id: req.params.id },
					},
				)
				.then(() =>
					res
						.status(201)
						.json({ message: "Utilisateur modifié avec succès !" }),
				)
				.catch((err) => {
					res.status(500).json({
						message: err.message,
					});
				});
		})
		.then(() => {
			if (req.body.password && schemaPassword.validate(req.body.password)) {
				bcrypt.hash(req.body.password, 10).then((hash) => {
					userModel
						.update(
							{
								password: hash,
							},
							{
								where: { id: req.params.id },
							},
						)
						.catch((err) => {
							res.status(500).json({
								message: err.message,
							});
						});
				});
			}
		})
		.catch((error) => res.status(500).json("Utilisateur non trouvé !",error));
};
exports.deleteUser = async (req, res) => {
	await userModel
		.findOne({
			where: { id: req.params.id },
		})
		.then((user) => {
			if (
				user.media !== `${req.protocol}://${req.get("host")}/images/avatar.webp`
			) {
				const filename = user.media.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {});
			}
			userModel
				.destroy({ where: { id: req.params.id } })
				.then(() => {
					res.status(200).json({
						message: "Votre compte utilisateur à été supprimé avec succès !",
					});
				})
				.catch((error) => res.status(404).json({message: "Erreur lors de la suppression dans la database !", error }));
		})
		.catch((error) => res.status(500).json({message:"Utilisateur non trouvé !", error}));
};
