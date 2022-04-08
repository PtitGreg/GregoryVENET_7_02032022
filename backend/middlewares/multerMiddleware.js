// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const multer = require("multer");

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/gif": "gif",
	"image/webp": "webp",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const extension = MIME_TYPES[file.mimetype];
		callback(null, Date.now() + "." + extension);
	},
});

module.exports = multer({
	storage,
	limits: {
		fileSize: 1 * 1024 * 1024, // Limite 1MB
	},
}).single("media");
