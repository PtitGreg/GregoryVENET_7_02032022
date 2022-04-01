const router = require("express").Router();
const userCtrl = require("../controllers/userController");
const multer = require("../middlewares/multerMiddleware");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.findOneUser);
router.put("/:id", multer, userCtrl.updateUser);
router.delete("/:id", multer, userCtrl.deleteUser);

module.exports = router;
