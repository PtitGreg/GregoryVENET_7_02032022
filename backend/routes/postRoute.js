// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const router = require("express").Router();
const postCtrl = require("../controllers/postController");
const auth = require("../middlewares/authMiddleware");
const multer = require("../middlewares/multerMiddleware");
const isOwner = require("../middlewares/isOwnerMiddleware");

router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);
router.patch("/:id/like", auth, postCtrl.likePost);

module.exports = router;
