// // Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

// const db = require("../models");
// const commentModel = db.comment;
// const fs = require("fs");

// exports.getAllComments = async (req, res) => {
// 		await commentModel
// 			.findAll({
// 				attributes: { ...postModel },
// 				order: [["createdAt", "DESC"]],
// 			})
// 			.then((posts) => res.status(200).json(posts))
// 			.catch((error) => res.status(400).json(error));
// };

// exports.createComment = async (req, res) => {
// 	const comment = {
// 		text: req.body.text,
// 	};

// 	commentModel.create(comment)
// 		.then(() => {
// 			res.send("Commentaire créé avec succès");
// 		})
// 		.catch((error) => res.status(500).send({ error }));
// };

// exports.updateComment = async (req, res) => {

// };

// exports.deleteComment = async (req, res) => {

// };

// exports.likeComment = async (req, res) => {

// };
