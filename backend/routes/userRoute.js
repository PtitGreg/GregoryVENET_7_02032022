const router = require("express").Router();
// const auth = require("../middlewares/authMiddleware");
const userCtrl = require("../controllers/userController");
// const multer = require("multer");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.findOne);
router.get("/role", userCtrl.roleUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);
// router.get("/messages/", userCtrl.getAllMessageAdmin);
// router.get("/users/", userCtrl.getAllUsersAdmin);


module.exports = router;
