"use client";
import Link from 'next/link';
import { useMemo, useState } from 'react';

const sampleCourses = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Course ${i + 1}`,
  category: ['Design', 'Development', 'Business'][i % 3],
  description: 'A modern course with interactive content and assessments.',
}));

export default function CoursesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return sampleCourses.filter((c) =>
      (category === 'All' || c.category === category) &&
      c.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, category]);

  return (
    <main className="container-responsive py-10">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
          >
            {['All', 'Design', 'Development', 'Business'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <article key={course.id} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow">
            <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800" />
            <h3 className="mt-3 text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{course.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <Link href={`/courses/${course.id}`} className="text-brand hover:underline">View details</Link>
              <Link href={`/courses/${course.id}/launch`} className="text-sm">Launch</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}


