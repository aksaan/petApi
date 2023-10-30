const express = require("express");
const controller = require("../controllers/shelterController");

const { upload } = require('../middlewares/upload');

const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get("/:id", controller.one);
router.delete("/:id", auth, controller.remove);
router.post("/", auth, controller.add);
router.put("/:id/avatar", auth, upload.single("avatar"), controller.avatar);
router.get("/", controller.all);

exports.router = router;