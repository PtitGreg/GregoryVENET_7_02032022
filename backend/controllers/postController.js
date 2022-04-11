// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const db = require("../models");
const postModel = db.post;

const fs = require("fs");

exports.getAllPosts = async (req, res) => {
	await postModel
		.findAll({
			order: [["createdAt", "DESC"]],
		})
		.then((post) => res.status(200).json(post))
		.catch((error) => res.status(400).json(error));
};

exports.createPost = async (req, res) => {
	let reqBody = req.body;
	if (req.file) {
		reqBody = {
			...reqBody,
			media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		};
	}
	await postModel
		.create(reqBody)
		.then(() => res.status(201).json({ message: "Post créé avec succès !" }))
		.catch((err) => {
			res.status(500).json({
				message: err.message,
			});
		});
};

exports.updatePost = async (req, res) => {
	await postModel
		.findOne({ where: { id: req.params.id } })
		.then((post) => {
			let dataBody = {
				...req.body,
			};
			if (req.file) {
				if (post.media) {
					const img = post.media.split("/images/")[1];
					fs.unlink("images/" + img, () => {});
				}
				dataBody = {
					...dataBody,
					media: `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`,
				};
			}
			postModel
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
						.json({ message: "Post modifié avec succès !" }),
				)
				.catch((err) => {
					res.status(500).json({
						message: err.message,
					});
				});
		})
		.catch((error) =>
			res.status(500).json({ message: "Post non trouvé !", error }),
		);
};

exports.deletePost = async (req, res) => {
	await postModel
		.findOne({
			where: { id: req.params.id },
		})
		.then((post) => {
			if (post.media) {
				const filename = post.media.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {});
			}
			postModel
				.destroy({ where: { id: req.params.id } })
				.then(() => {
					res.status(200).json({
						message: "Post supprimé avec succès !",
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
			res.status(500).json({ message: "Post non trouvé !", error }),
		);
};

exports.adminDeletePost = async (req, res) => {
	await postModel
		.findOne({
			where: { id: req.params.id },
		})
		.then((post) => {
			if (post.media) {
				const filename = post.media.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {});
			}
			postModel
				.destroy({ where: { id: req.params.id } })
				.then(() => {
					res.status(200).json({
						message: "Post supprimé avec succès !",
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
			res.status(500).json({ message: "Post non trouvé !", error }),
		);
};

// exports.likePost = async (req, res) => {};
