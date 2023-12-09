import { Router } from "express";
import { add } from "../controllers/addressController";

const router = Router();

router.post("/add", add);

export default router;