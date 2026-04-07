"use client";

import LoginLeftPanel from "./LoginLeftPanel";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-64px)] bg-background w-full px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-background max-w-7xl w-full mx-auto">
        <LoginLeftPanel />
        <LoginForm />
      </div>
    </div>
  );
}
