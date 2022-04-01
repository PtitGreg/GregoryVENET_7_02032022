const db = require("../models");

// image Upload
const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
// 	destination: (req, file, callback) => {
// 		callback(null, "images");
// 	},
// 	fileFilter: (req, file, callback) => {
// 		const fileTypes = {
// 			"image/jpg": "jpg",
// 			"image/jpeg": "jpg",
// 			"image/png": "png",
// 			"image/gif": "gif",
// 			"image/mp4": "mp4",
// 			"image/webp:": "webp",
// 		};
// 		const mimeType = fileTypes.test(file.mimetype)
// 		const extName = fileTypes.test(path.extName(file.originalname))
// 		if (mimeType && extName) {
// 			return callback(null, true)
// 		}
// 		callback("Fournir le bon format image(jpg, png, gif, mp4, webp)")
// 	},
// 	fileName: (req, file, callback) => {
// 		callback(null, Date.now() + path.extname(file.originalname))
// 	}
// });

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		callback(null, Date.now() + "." + extension);
	},
});
module.exports = multer({ storage }).single("image");

module.exports = multer({
	storage,
	limits: {fileSize: "1000000"}
}).single("avatar");
