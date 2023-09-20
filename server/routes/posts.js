import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();

/* POST*/
router.post("/", verifyToken, singleUpload, createPost);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:id", getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* delete */
router.delete("/:postId/deletePost", deletePost);

export default router;
