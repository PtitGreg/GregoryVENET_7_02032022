const db = require('../models')
const postModel = db.postModel
const fs = require('fs')

exports.readAllPost = async (req, res) => {
	await postModel
		.findAll({
			attributes: ["title", "content", "attachment", "like", "unlike"],
			order: [["createdAt", "DESC"]],
		})
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json(error));
};

exports.createPost = async (req, res) => {
	console.log('req: ', req.body);
	// const imageUrl = "";
	// if (req.file) {
	// 	imageUrl = `${req.protocol}://${req.get("host")}/images/${
	// 		req.file.filename
	// 	}`;
	// }
	// const post = {
	// 	title: req.body.title,
	// 	content: req.body.content,
	// 	media: imageUrl,
	// 	like: 0,
	// 	unlike: 0,
	// };
	// await postModel
	// 	.create(post)
	// 	.then((post) => res.status(201).json({ message: "Post créé !", post }))
	// 	.catch((err) => {
	// 		res.status(500).json({
	// 			message: err.message,
	// 		});
	// 	});
};

exports.updatePost = (req, res) => {

};

exports.deletePost = (req, res) => {

};

exports.likePost = async (req, res) => {

};

exports.unlikePost = async (req, res) => {

};

exports.readAllCommentsPost = async (req, res) => {

}
exports.createCommentPost = (req, res) => {

};

exports.editCommentPost = (req, res) => {

};

exports.deleteCommentPost = (req, res) => {

};
