"use client";
import { useEffect, useState } from 'react';

type Course = { id: string; title: string; description?: string; isPublished: boolean };

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/courses')
      .then((r) => r.json())
      .then(setCourses)
      .catch(() => setCourses([]));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Courses</h1>
      <div className="grid gap-3">
        {courses.map((c) => (
          <div key={c.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{c.description}</div>
          </div>
        ))}
        {courses.length === 0 && <div className="text-sm text-gray-500">No courses yet.</div>}
      </div>
    </div>
  );
}


