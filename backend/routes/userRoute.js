const router = require("express").Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const multer = require("../middlewares/multerMiddleware");
const isOwner = require("../middlewares/isOwnerMiddleware");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/",auth, userCtrl.getAllUsers);
router.get("/:id",auth, userCtrl.findOneUser);
router.put("/:id",auth, multer, userCtrl.updateUser);
router.delete("/:id",auth, multer, userCtrl.deleteUser);

module.exports = router;
