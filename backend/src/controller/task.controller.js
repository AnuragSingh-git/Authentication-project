import Task from "../model/task.model.js"
import userModel from "../model/user.model.js";

export const createTask = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create task" });
    }

    const { title, projectId, assignedTo } = req.body;
    const user=await userModel.findOne({email:assignedTo})

    const task = await Task.create({
      title,
      projectId,
      assignedTo:user._id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find()
        .populate("assignedTo", "name")
        .populate("projectId", "name");
    } else {
      tasks = await Task.find({ assignedTo: req.user.id })
        .populate("projectId", "name");
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (
      req.user.role === "member" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deletetask=async (req,res)=>{
  const user=await Task.findByIdAndDelete(req.params.id)

  res.status(200).json({
    message:"task deleted"
  })
}