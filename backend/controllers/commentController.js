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
	let reqBody = req.body;
	console.log('reqBody: ', reqBody);
	if (req.file) {
		reqBody = {
			...reqBody,
			media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		};
	}
	await commentModel
		.create(reqBody)
		.then(() => res.status(201).json({ message: "Commentaire créé avec succès !" }))
		.catch((err) => {
			res.status(500).json({
				message: err.message,
			});
		});
};

exports.updateComment = async (req, res) => {
	await commentModel
		.findOne({ where: { id: req.params.id } })
		.then((comment) => {
			let dataBody = {
				...req.body,
			};
			if (req.file) {
				const img = comment.media.split("/images/")[1];
				if (img) {
					fs.unlinkSync("images/" + img, () => {});
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
		.catch((error) => res.status(500).json("Commentaire non trouvé !", error));
};

exports.deleteComment = async (req, res) => {
	await commentModel
		.findOne({
			where: { id: req.params.id },
		})
		.then((comment) => {
			if (
				comment.media !==
				`${req.protocol}://${req.get("host")}/images/default/avatar.webp`
			) {
				const filename = comment.media.split("/images/")[1];
				fs.unlinkSync(`images/${filename}`, () => {});
			}
			postModel
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

exports.adminDeleteComment =async (req, res) => {
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
}
