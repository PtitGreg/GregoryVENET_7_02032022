// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const db = require("../models");
const commentModel = db.comment;

const fs = require("fs");

exports.getAllComments = async (req, res) => {
	await commentModel
		.findAll({
			order: [["createdAt", "DESC"]],
		})
		.then((comment) => res.status(200).json(comment))
		.catch((error) => res.status(400).json(error));
};

exports.createComment = async (req, res) => {
	let reqBody = {
		...req.body,
		UserId: req.token.userId,
	};
	if (req.file) {
		console.log("req.token.userId: ", req.token.userId);
		reqBody = {
			...reqBody,
			media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		};
	}
	await commentModel
		.create(reqBody)
		.then(() =>
			res.status(201).json({ message: "Commentaire créé avec succès !" }),
		)
		.catch((err) => {
			res.status(500).json({
				message: err.message,
			});
		});
};

exports.updateComment = async (req, res) => {
	console.log("req.params.id: ", req.params.id);
	await commentModel
		.findOne({ where: { id: req.params.id } })
		.then((comment) => {
			let dataBody = {
				...req.body,
			};
			if (req.file) {
				if (comment.media) {
					const img = comment.media.split("/images/")[1];
					fs.unlink("images/" + img, () => {});
				}
				dataBody = {
					...dataBody,
					media: `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`,
				};
			}
			commentModel
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
						.json({ message: "Commentaire modifié avec succès !" }),
				)
				.catch((err) => {
					res.status(500).json({
						message: err.message,
					});
				});
		})
		.catch((error) =>
			res.status(500).json({ message: "Commentaire non trouvé !", error }),
		);
};

exports.deleteComment = (req, res) => {
	console.log("req.params.id: ", req.params.id);
	commentModel
		.findOne({
			where: { id: req.params.id },
		})
		.then((comment) => {
			if (comment.media) {
				const filename = comment.media.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {});
			}
			commentModel
				.destroy({ where: { id: req.params.id } })
				.then(() => {
					res.status(200).json({
						message: "Commentaire supprimé avec succès !",
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
			res.status(500).json({ message: "Commentaire non trouvé !", error }),
		);
};

exports.adminDeleteComment = async (req, res) => {
	console.log("req.params.id: ", req.params.id);
	await commentModel
		.findOne({
			where: { id: req.params.id },
		})
		.then((comment) => {
			if (comment.media) {
				const filename = comment.media.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {});
			}
			commentModel.destroy({ where: { id: req.params.id } }).then(() => {
				res.status(200).json({
					message: "Commentaire supprimé avec succès !",
				});
			});
		});
};
