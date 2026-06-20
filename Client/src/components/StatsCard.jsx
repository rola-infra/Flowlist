function StatsCard({ title, value }) {
  return (
    <div className="border rounded p-4 w-48">
      <h3 className="text-gray-500">{title}</h3>

      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default StatsCard;
