// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

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

exports.signup = async (req, res) => {
	let admin = false;
	let media = `${req.protocol}://${req.get("host")}/images/default/avatar.webp`;
	if (schemaPassword.validate(req.body.password)) {
		if (req.body.email === "admin@groupomania.com") {
			admin = true;
			media = `${req.protocol}://${req.get("host")}/images/default/admin.jpg`;
		}
		bcrypt.hash(req.body.password, 10).then((hash) => {
			const reqBody = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hash,
				isAdmin: admin,
				media,
			};
			userModel
				.create(reqBody)
				.then(() =>
					res.status(201).json({ message: "Utilisateur créé avec succès!" }),
				)
				.catch((error) => {
					res.status(500).json({
						error
					});
				});
		});
	} else {
		res.status(401).json({
			errorPassword:
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
						.json({ errorMail: "identifiants non valide ou inéxistant" });
				} else {
					bcrypt
						.compare(req.body.password, user.password)
						.then((valid) => {
							if (!valid) {
								return res.status(401).json({ errorPassword: "Mot de passe incorrect !" });
							}
							res.status(200).json({
								id: user.id,
								isAdmin:user.isAdmin,
								username: user.username,
								token: jwt.sign(
									{
										userId: user.id,
										isAdmin: user.isAdmin,
									},
									process.env.TOKEN_KEY,
									{
										expiresIn: "8h",
									},
								),
								message: "Utilisateur connecté avec succès !",
							});
						})
						.catch((error) => res.status(500).json({ error }));
				}
			})
			.catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = async (req, res) => {
	await userModel
		.findAll()
		.then((users) => res.status(200).json(users))
		.catch((error) => res.status(400).json(error));
};

exports.getOneUser = async (req, res) => {
	await userModel
		.findOne({ where: { id: req.params.id } })
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
				message: "erreur lors de la récupération de l'utilisateur !",
				err,
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
				const fileNameDefaultUser = `${req.protocol}://${req.get(
					"host",
				)}/images/default/avatar.webp`;
				const fileNameDefaultAdmin = `${req.protocol}://${req.get(
					"host",
				)}/images/default/admin.jpg`;
				if (user.media !==fileNameDefaultUser && user.media !==fileNameDefaultAdmin) {
					fs.unlink("images/" + img, () => {});
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
		.catch((error) => res.status(500).json("Utilisateur non trouvé !", error));
};
exports.deleteUser = async (req, res) => {
	const userId = req.auth;
	await userModel
		.findOne({
			where: { id: req.params.id },
		})
		.then((user) => {
			if (
				user.media !==
				`${req.protocol}://${req.get("host")}/images/default/avatar.webp`
			) {
				const filename = user.media.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {});
			}
			delete req.token;
			userModel
				.destroy({ where: { id: req.params.id } })
				.then(() => {
					res.status(200).json({
						message: "Utilisateur supprimé avec succès !",
					});
				})
				.catch((error) =>
					res.status(404).json({
						message: "Erreur lors de la suppression dans la database !",
						error,
					}),
				);
		})
		.catch((error) =>
			res.status(500).json({ message: "Utilisateur non trouvé !", error }),
		);
};

exports.adminDeleteUser = async (req, res) => {
	const userId = req.auth;
	await userModel
		.findOne({
			where: { id: userId },
		})
		.then((user) => {
			if (
				user.media !==
				`${req.protocol}://${req.get("host")}/images/default/avatar.webp`
			) {
				const filename = user.media.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {});
			}
			userModel
				.destroy({ where: { id: req.params.id } })
				.then(() => {
					res.status(200).json({
						message: "Utilisateur supprimé avec succès !",
					});
				})
				.catch((error) =>
					res.status(404).json({
						message: "Erreur lors de la suppression dans la database !",
						error,
					}),
				);
		})
		.catch((error) =>
			res.status(500).json({ message: "Utilisateur non trouvé !", error }),
		);
};
