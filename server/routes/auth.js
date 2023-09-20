import express from "express";
import { login, register } from "../controllers/auth.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", singleUpload, register);

export default router;
