const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.put("/profile", controller.profile);
router.put("/users/:id/delete", controller.deleteUser);
router.get("/", controller.all)

exports.router = router;