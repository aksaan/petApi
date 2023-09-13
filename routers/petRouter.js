const express = require("express");
const controller = require("../controllers/petController");

const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post("/add", controller.add);
router.get("/", controller.all);

exports.router = router;