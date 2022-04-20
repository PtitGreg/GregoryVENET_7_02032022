// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const router = require("express").Router();
const postCtrl = require("../controllers/postController");
const authUser = require("../middlewares/authUserMiddleware");
const multer = require("../middlewares/multerMiddleware");
const isOwnerPost = require("../middlewares/isOwnerPostMiddleware");
const authAdmin = require("../middlewares/authAdminMiddleware");


router.get("/", authUser, postCtrl.getAllPosts);
router.post("/", authUser, multer, postCtrl.createPost);
router.put("/:id", authUser, isOwnerPost, multer, postCtrl.updatePost);
router.delete("/:id", authUser, isOwnerPost, multer, postCtrl.deletePost);

router.delete("/admin/:id", authAdmin, multer, postCtrl.adminDeletePost);

module.exports = router;
