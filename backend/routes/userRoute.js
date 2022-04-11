// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const router = require("express").Router();
const userCtrl = require("../controllers/userController");
const multer = require("../middlewares/multerMiddleware");
const authUser = require("../middlewares/authUserMiddleware");
const authAdmin = require("../middlewares/authAdminMiddleware");
const isOwnerUser = require("../middlewares/isOwnerUserMiddleware");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", authUser, userCtrl.getAllUsers);
router.get("/:id", authUser, userCtrl.getOneUser);
router.put("/:id", authUser, isOwnerUser, multer, userCtrl.updateUser);
router.delete("/:id", authUser, isOwnerUser, multer, userCtrl.deleteUser);

router.delete("/admin/:id", authAdmin, multer, userCtrl.adminDeleteUser);

module.exports = router;
