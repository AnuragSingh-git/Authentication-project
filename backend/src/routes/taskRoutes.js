import express from "express";
import {createTask,deletetask,getTasks,updateTaskStatus} from "../controller/task.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);         
router.get("/", protect, getTasks);             
router.put("/:id", protect, updateTaskStatus);
router.delete("/:id", protect,deletetask);

export default router;