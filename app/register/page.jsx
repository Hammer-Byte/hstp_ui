"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import LoginLeftPanel from "../login/LoginLeftPanel";
import RegisterForm from "./RegisterForm";
import MobileRegister from "./MobileRegister";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = useCallback((data) => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      // Simulate success and redirect
      router.push("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading, router]);

  return (
    <>
      {/* Mobile-only pixel-perfect signup */}
      <div className="md:hidden block">
        <MobileRegister loading={loading} onRegister={handleRegister} />
      </div>

      {/* Desktop-only original signup */}
      <div className="hidden md:flex items-center justify-center min-h-[calc(100dvh-64px)] bg-background w-full px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-background max-w-7xl w-full mx-auto">
          <LoginLeftPanel />
          <RegisterForm loading={loading} onRegister={handleRegister} />
        </div>
      </div>
    </>
  );
}
