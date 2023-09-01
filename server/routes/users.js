import express from "express";
import { verifyUser } from "../middleware/auth.js";
import { getUser, getUserFriends, addRemoveFriends } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", verifyUser, getUser);
router.get("/:id/friends", verifyUser, getUserFriends);
router.patch("/:id/:friendId", verifyUser, addRemoveFriends);

export default router;