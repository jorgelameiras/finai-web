import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl font-thin tracking-tighter text-[#E4E1E9]">404</div>
        <h1 className="text-2xl font-light text-[#E4E1E9]">Page not found</h1>
        <p className="text-[#78716C] font-light">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="bg-[#E9C176] text-[#412D00] px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(233,193,118,0.3)] transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="border border-[#4E4639]/30 text-[#E9C176] px-8 py-3 rounded-xl font-medium hover:bg-[#1B1B20] transition-all"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
