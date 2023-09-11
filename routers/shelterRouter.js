const express = require("express");
const controller = require("../controllers/shelterController");

const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get("/:id", controller.one);
router.delete("/:id", auth, controller.remove);
router.post("/", auth, controller.add);
router.get("/", controller.all);

exports.router = router;