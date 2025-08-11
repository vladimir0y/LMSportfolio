import Link from 'next/link';

export default function CourseDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <main className="container-responsive py-10">
      <h1 className="text-2xl font-bold mb-2">Course {id}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Detailed description, syllabus, and modules.</p>
      <div className="grid gap-4">
        {[1, 2, 3].map((m) => (
          <div key={m} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="font-medium">Module {m}</div>
            <ul className="list-disc ml-6 text-sm text-gray-600 dark:text-gray-300">
              <li>Topic 1 — PDF</li>
              <li>Topic 2 — Video</li>
              <li>Topic 3 — SCORM</li>
            </ul>
            <div className="mt-2">
              <Link href={`/courses/${id}/launch`} className="text-brand hover:underline">Launch SCORM</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}


