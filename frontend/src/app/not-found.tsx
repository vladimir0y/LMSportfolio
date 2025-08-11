import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container-responsive py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">The page you are looking for does not exist.</p>
      <Link href="/" className="text-brand hover:underline">Go home</Link>
    </main>
  );
}


