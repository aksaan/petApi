import { Router } from "express";
import { auth } from "../middlewares/auth";
import { add, all } from "../controllers/petController";

const router = Router();

router.post("/add", auth, add);
router.get("/", all);

export default router;