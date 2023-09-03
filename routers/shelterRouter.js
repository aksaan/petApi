const express = require("express");
const controller = require("../controllers/shelterController");

const router = express.Router();

router.post("/add", controller.add);
router.put("/", controller.sheltpage);

exports.router = router;