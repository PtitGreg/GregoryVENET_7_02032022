// Formation OpenClassrooms - Développeur Web - Projet 7 - Grégory VENET

const router = require("express").Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const multer = require("../middlewares/multerMiddleware");
const isOwner = require("../middlewares/isOwnerMiddleware");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, isOwner, multer, userCtrl.updateUser);
router.delete("/:id", auth, isOwner, multer, userCtrl.deleteUser);

module.exports = router;
