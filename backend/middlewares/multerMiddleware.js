// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const multer = require("multer");

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/gif" ||
	file.mimetype === "image/web" ||
	file.mimetype === "image/png" ||
	file.mimetype === "image/jpg" ||
	file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		return cb(new Error("Media non compatible !"));
	}
}
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
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		console.log('extension: ', extension);
		callback(null, name + Date.now() + "." + extension);
	},
});

module.exports = multer({
	fileFilter,
	storage,
	limits: {
		fileSize: 1 * 1024 * 1024, // Limite 1MB
	}
}).single("media");
