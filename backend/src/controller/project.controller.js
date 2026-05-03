import Project from "../model/project.model.js";

export const createProject = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create project" });
    }

    const project = await Project.create({
      name: req.body.name,
      createdBy: req.user.id
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};