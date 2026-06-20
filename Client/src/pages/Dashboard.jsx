import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import StatsCard from "../components/StatsCard.jsx";
import RecentTasks from "../components/RecentTasks.jsx";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);

  async function getStats() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:4000/api/v1/tasks/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(response.data.data);
      const taskResponse = await axios.get(
        "http://127.0.0.1:4000/api/v1/tasks?sort=-createdAt",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTasks(taskResponse.data.data.tasks);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }
  console.log(stats);
  useEffect(() => {
    getStats();
  }, []);

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="flex gap-4 mb-8">
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
