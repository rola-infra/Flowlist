import { useState, useEffect } from "react";
import axios from "axios";

function Tasks() {
  // STATES
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // GET TASKS
  async function getTasks() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://127.0.0.1:4000/api/v1/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.data.tasks);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  // CREATE TASK
  async function createTask(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:4000/api/v1/tasks",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      setDescription("");

      getTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  // RUN ON PAGE LOAD
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      {/* CREATE TASK FORM */}
      <form onSubmit={createTask} className="border rounded p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <button type="submit" className="border rounded p-2">
          Create Task
        </button>
      </form>

      {/* TASK LIST */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="border rounded p-4">
              <h2 className="text-xl font-bold">{task.title}</h2>

              <p>{task.description}</p>

              <p>Status: {task.status}</p>

              <p>Priority: {task.priority}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;
