import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import {
  createPost,
  deletePost,
  likeOrDislike,
  getAllPosts,
  getUserPosts,
  getExplorePosts,
} from "../controllers/post.js";

const router = express.Router();

router.post("/", checkAuth, createPost);
router.delete("/:id", checkAuth, deletePost);
router.put("/:id/like", likeOrDislike);
router.get("/timeline/:id", getAllPosts);
router.get("/user/all/:id", getUserPosts);
router.get("/explore", getExplorePosts);

export default router;