const express = require("express");
const controller = require("../controllers/shelterController");

const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post("/add", auth, controller.add);

exports.router = router;