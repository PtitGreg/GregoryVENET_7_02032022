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
			userId: req.body.userId,
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
	await postModel.findOne({ where: { id: req.params.id } })
		.then((post) => {
		let dataBody = {
			...req.body,
		};
		if (req.file) {
			const img = post.media.split("/images/")[1];
			console.log("img: ", img);
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
				res.status(201).json({ message: "Utilisateur modifié avec succès !" }),
			)
			.catch((err) => {
				res.status(500).json({
					message: err.message,
				});
			});
		})
		.catch((error) => res.status(500).json("Post non trouvé !",error));
};

exports.deletePost = async (req, res) => {};

exports.likePost = async (req, res) => {};
