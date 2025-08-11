"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container-responsive py-20">
          <div className="flex flex-col items-center text-center gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight"
            >
              Learn without limits
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-2xl text-lg text-gray-600 dark:text-gray-300"
            >
              Explore our catalog of modern courses with interactive activities, videos, and SCORM modules.
            </motion.p>
            <div className="flex gap-3">
              <Link href="/courses">
                <Button>Browse courses</Button>
              </Link>
              <Button variant="secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                Toggle {theme === 'dark' ? 'Light' : 'Dark'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-responsive py-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured courses</h2>
          <Link href="/courses" className="text-brand hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow"
            >
              <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800" />
              <h3 className="mt-3 text-lg font-semibold">Course {id}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Short description about the course.</p>
              <div className="mt-3 flex justify-between items-center">
                <Link href={`/courses/${id}`} className="text-brand hover:underline">
                  View details
                </Link>
                <Button variant="ghost">Launch</Button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}


