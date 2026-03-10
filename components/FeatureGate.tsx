"use client";

interface Props {
  children: React.ReactNode;
  unlocked: boolean;
  message: string;
}

export default function FeatureGate({ children, unlocked, message }: Props) {
  if (unlocked) return <>{children}</>;
  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none opacity-40">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-xl">
        <span className="text-2xl mb-2">🔒</span>
        <p className="text-white text-sm font-medium text-center px-4">
          {message}
        </p>
      </div>
    </div>
  );
}
