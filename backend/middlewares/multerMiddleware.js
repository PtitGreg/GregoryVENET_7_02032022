// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const multer = require("multer");

const fileFilter = (req, file, callback) => {
	const ext = file.mimetype.split("/")[1];
	if (
		ext !== "png" &&
		ext !== "jpg" &&
		ext !== "gif" &&
		ext !== "jpeg" &&
		ext !== "webp"
	) {
		return callback({
			message:
				"Les images au format png, jpg, gif, jpeg et webp uniquement sont acceptées",
		});
	} else {
		callback(null, true);
	}
};
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
		callback(null, name + Date.now() + "." + extension);
	},
});

module.exports = multer({
	fileFilter,
	storage,
	limits: {
		fileSize: 1 * 1024 * 1024, // Limite 1MB
	},
}).single("media");
