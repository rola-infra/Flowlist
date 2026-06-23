import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import StatsCard from "../components/StatsCard.jsx";
import RecentTasks from "../components/RecentTasks.jsx";
import { API_URL } from "../config/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  async function getStats() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/tasks/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.data);
      const taskResponse = await axios.get(`${API_URL}/tasks?sort=-createdAt`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(taskResponse.data.data.tasks);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }
  console.log(stats);
  useEffect(() => {
    getStats();
  }, []);
  if (error) {
    return <p>{error}</p>;
  }

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatsCard title="Total Tasks" value={stats.totalTasks} />

          <StatsCard title="Completed" value={stats.completedTasks} />

          <StatsCard title="Pending" value={stats.pendingTasks} />

          <StatsCard title="Progress" value={stats.progressTasks} />

          <StatsCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
          />
        </div>

        <RecentTasks tasks={tasks} />
      </main>
    </div>
  );
}

export default Dashboard;
