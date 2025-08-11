export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">Welcome to the admin panel.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[['Courses', 12], ['Users', 128], ['Completions', 62], ['Media', 58]].map(([label, value]) => (
          <div key={label as string} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">{label as string}</div>
            <div className="text-2xl font-bold">{value as number}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


