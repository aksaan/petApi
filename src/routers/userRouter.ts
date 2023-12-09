import { Router } from "express";
import { auth } from "../middlewares/auth";
import { signup, signin, me, all } from "../controllers/userController";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
// router.put("/users/:id/delete", controller.deleteUser);
router.get("/me", auth, me);
router.get("/", auth, all)

export default router;