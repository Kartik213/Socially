import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/",verifyUser, getFeedPosts);
router.get("/:userId/posts", verifyUser, getUserPosts);
router.patch("/:id/like", verifyUser, likePost);

export default router;