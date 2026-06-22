import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import { API_URL } from "../config/api";

function Tasks() {
  // STATES
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  // GET TASKS
  async function getTasks() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/tasks`, {
        params: {
          search,
          status: filterStatus,
          priority: filterPriority,
          sort,
          page,
          limit: 5,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

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
        `${API_URL}/tasks`,
        {
          title,
          description,
          status,
          priority,
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

  // DeLETE TASK
  async function deleteTask(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }
  async function updateTask(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API_URL}/tasks/${editingTask._id}`,
        {
          title,
          description,
          status,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditingTask(null);
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
  }, [search, filterStatus, filterPriority, sort, page]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 md:p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>

        {/* CREATE TASK FORM */}
        <form
          onSubmit={editingTask ? updateTask : createTask}
          className="border rounded p-4 mb-6"
        >
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
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="todo">Todo</option>

            <option value="progress">In Progress</option>

            <option value="done">Done</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="low">Low</option>

            <option value="medium">Medium</option>

            <option value="high">High</option>
          </select>

          <button type="submit" className="mt-4 border rounded px-4 py-2">
            {editingTask ? "Update Task" : "Create Task"}
          </button>
        </form>

        {/* TASK LIST */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded w-full md:w-auto mb-4"
        >
          <option value="-createdAt">Newest</option>

          <option value="createdAt">Oldest</option>

          <option value="priority">Priority</option>
        </select>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search Tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
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
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingTask(task);

                      setTitle(task.title);

                      setDescription(task.description);
                      setStatus(task.status);
                      setPriority(task.priority);
                    }}
                    className="mt-4 border rounded px-4 py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Are you sure you want to delete this task?",
                      );

                      if (confirmed) {
                        deleteTask(task._id);
                      }
                    }}
                    className="mt-4 border rounded px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="border px-4 py-2 rounded"
            >
              Prev
            </button>

            <span>Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="border px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
