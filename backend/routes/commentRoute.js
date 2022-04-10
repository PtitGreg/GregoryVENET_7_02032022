// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const router = require("express").Router();
const commentCtrl = require("../controllers/commentController");
const authUser = require("../middlewares/authUserMiddleware");
const multer = require("../middlewares/multerMiddleware");
const isOwner = require("../middlewares/isOwnerMiddleware");
const authAdmin = require("../middlewares/authAdminMiddleware");

router.get("/", authUser, commentCtrl.getAllComments);
router.post("/:id", authUser, multer, commentCtrl.createComment);
router.put("/:id", authUser, isOwner, multer, commentCtrl.updateComment);
router.delete("/:id", authUser, isOwner, multer, commentCtrl.deleteComment);
// router.patch("/:id/like", authUser, commentCtrl.likeComment);

router.delete("/admin/:id", authAdmin, multer, commentCtrl.adminDeleteComment);


module.exports = router;
