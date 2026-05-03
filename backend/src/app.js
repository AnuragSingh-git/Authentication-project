import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
  origin: "https://authentication-project1-sooty.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
