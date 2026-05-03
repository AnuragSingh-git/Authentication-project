import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
  const res = await API.get("/auth/getMe");
  setUser(res.data);
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks",{withCredentials:true});
    setTasks(res.data);
  };

  const fetchProjects = async () => {
    const res = await API.get("/projects",{withCredentials:true});
    setProjects(res.data);
  };

  const createProject = async () => {
  try {
    if (!projectName) {
      alert("Enter project name");
      return;
    }

    const res = await API.post("/projects", { name: projectName },{withCredentials:true});

    console.log(res.data);
    setProjectName("");
    fetchProjects();

    alert("Project created");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error creating project");
  }
};

  const createTask = async () => {
    if (!title || !projectId || !assignedTo) {
      alert("Fill all fields");
      return;
    }

    await API.post("/tasks", {
      title,
      projectId,
      assignedTo
    },{withCredentials:true});

    setTitle("");
    setProjectId("");
    setAssignedTo("");
    fetchTasks();
  };

  const updateStatus = async (id) => {
    await API.put(`/tasks/${id}`, { status: "done" },{withCredentials:true});
    fetchTasks();
  };

  const handledelete=async (id)=>{
    await API.delete(`/tasks/${id}`,{withCredentials:true})
    fetchTasks()
  }

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUser();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {user?.role === "admin" && (
        <>
          <h3>Create Project</h3>

          <input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button onClick={createProject}>Create Project</button>
        </>
      )}

      {user?.role === "admin" && (
        <div>
          <h3>Create Task</h3>

          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Assign User email"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <button onClick={createTask}>Create Task</button>
        </div>
      )}

      <h3>Tasks {tasks.filter(task=>task.status==="done").length} of {tasks.length} completed</h3>

      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <p><b>{task.title} {(user?.role==="admin"&&<button style={{backgroundColor:"red"}} onClick={()=>{handledelete(task._id)}}>Delete</button>)}</b></p>
          <p>Project: {task.projectId?.name || "N/A"}</p>
          <p>Status: {task.status}</p>

          {(user?.role==="member"&&<button
            disabled={task.status === "done"}
            onClick={() => updateStatus(task._id)}
          >
            {task.status === "done" ? "Completed" : "Mark Done"}
          </button>
          )}
          </div>
      ))}
    </div>
  );
}

export default Dashboard;
