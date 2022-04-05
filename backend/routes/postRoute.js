const router = require("express").Router();
const postCtrl = require("../controllers/postController");
const multer = require("multer");
const auth = require("../middlewares/authMiddleware");
const isOwner = require("../middlewares/isOwnerMiddleware");

router.get("/", auth, postCtrl.readAllPost);
router.post("/", postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.patch("/like-post/:id", auth, postCtrl.likePost);
router.patch("/unlike-post/:id", auth, postCtrl.unlikePost);

router.get("/read-comment", postCtrl.readAllCommentsPost);
router.post("/comment/:id", auth, postCtrl.createCommentPost);
router.patch("/edit-comment/:id", auth, postCtrl.editCommentPost);
router.delete("/delete-comment/:id", auth, postCtrl.deleteCommentPost);

module.exports = router;
