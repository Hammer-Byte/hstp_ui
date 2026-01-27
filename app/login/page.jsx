"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import LoginLeftPanel from "./LoginLeftPanel";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      router.push("/hotel-selection");
    }, 600);

    return () => clearTimeout(timer);
  }, [loading, router]);

  return (
    <div className="flex items-center justify-center h-[calc(100dvh-66px)] bg-background w-full px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-background max-w-7xl w-full mx-auto">
        <LoginLeftPanel />
        <LoginForm loading={loading} onLogin={handleLogin} />
      </div>
    </div>
  );
}
