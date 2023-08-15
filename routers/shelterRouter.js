const express = require("express");
const controller = require("../controllers/shelterController");
const router = express.Router();
router.post("/shelter", controller.shelter);
router.put("/", controller.sheltpage);
exports.router = router;