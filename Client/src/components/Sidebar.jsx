import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    

    <aside className="w-20 md:w-64 min-h-screen bg-slate-900 text-white p-3 md:p-6">
      <h1 className="hidden md:block text-2xl font-bold mb-8">Task Manager</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="p-3 rounded hover:bg-slate-800">
          Dashboard
        </Link>

        <Link to="/tasks" className="p-3 rounded hover:bg-slate-800">
          Tasks
        </Link>

        <Link to="/profile" className="p-3 rounded hover:bg-slate-800">
          Profile
        </Link>

        <button
          onClick={logout}
          className="p-3 rounded text-left hover:bg-red-600 mt-8"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
