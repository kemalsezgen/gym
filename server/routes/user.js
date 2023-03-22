import express from "express";
import { getUser, update, deleteUser, follow, unFollow } from "../controllers/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();


router.put("/:id", checkAuth, update);
router.get("/find/:id", getUser);
router.delete("/:id", checkAuth, deleteUser);
router.put("/follow/:id", checkAuth, follow);
router.put("/unfollow/:id", checkAuth, unFollow);

export default router;