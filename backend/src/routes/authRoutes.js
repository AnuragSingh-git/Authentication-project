import express from "express";
import { signup, login, getMe } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getMe", getMe);

export default router;
