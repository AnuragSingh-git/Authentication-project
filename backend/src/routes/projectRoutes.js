import express from "express";
import { createProject, getProjects } from "../controller/project.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);

export default router;