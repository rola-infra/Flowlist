function RecentTasks({ tasks }) {
  return (
    <div className="border rounded p-4 mt-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.slice(0, 5).map((task) => (
          <div key={task._id} className="border-b py-2">
            <p className="font-medium">{task.title}</p>

            <p className="text-sm text-gray-500">{task.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentTasks;
