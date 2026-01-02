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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      <LoginLeftPanel />
      <LoginForm loading={loading} onLogin={handleLogin} />
    </div>
  );
}
