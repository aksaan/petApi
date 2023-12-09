import { Router } from "express";
import { auth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { add, avatar, one, all, remove } from "../controllers/shelterController";

const router = Router();

router.get("/:id", one);
router.delete("/:id", auth, remove);
router.post("/", auth, add);
router.put("/:id/avatar", auth, upload.single("avatar"), avatar);
router.get("/", all);

export default router;