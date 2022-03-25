const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const userCtrl = require("../controllers/userController");
const multer = require("multer");
const upload = multer();

router.post("/register", userCtrl.signUp);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);



module.exports = router;
