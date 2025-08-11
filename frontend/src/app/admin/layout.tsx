import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = { title: 'Admin | OpenLMS' };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 p-4">
        <h2 className="font-semibold mb-4">Admin</h2>
        <nav className="grid gap-2 text-sm">
          <Link href="/admin" className="hover:underline">Dashboard</Link>
          <Link href="/admin/courses" className="hover:underline">Courses</Link>
          <Link href="/admin/media" className="hover:underline">Media</Link>
          <Link href="/admin/analytics" className="hover:underline">Analytics</Link>
          <Link href="/admin/settings" className="hover:underline">Settings</Link>
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}


