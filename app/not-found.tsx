'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  router.push('/');

  return (
    <div>
      <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
    </div>
  );
}
