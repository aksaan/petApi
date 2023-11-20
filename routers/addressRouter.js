const express = require("express");
const controller = require("../controllers/addressController");

const router = express.Router();

router.post("/add", controller.add);

exports.router = router;