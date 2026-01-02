import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm({ loading, onLogin }) {
  return (
    <div className="relative flex flex-col justify-center px-5 py-10 sm:px-10">
      {/* MOBILE BACKDROP */}
      <div className="absolute inset-0 bg-muted/40 md:bg-transparent" />

      <div className="relative mx-auto w-full max-w-sm">
        {/* MOBILE HERO */}
        <div className="mb-8 md:hidden">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Welcome back
          </span>
          <h1 className="text-3xl font-semibold mt-1">Sign in</h1>
          <p className="text-muted-foreground mt-1">
            Continue your training
          </p>
        </div>

        {/* CARD */}
        <div className="surface surface-hover p-7 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Sign in</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Use your official email
            </p>
          </div>

          <div className="space-y-4">
            {/* EMAIL */}
            <div className="space-y-1 group">
              <label className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <Input
                placeholder="you@company.com"
                className="
                  transition-all
                  focus-visible:ring-ring
                  focus-visible:scale-[1.01]
                  group-hover:border-primary/40
                "
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1 group">
              <label className="text-xs font-medium text-muted-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                className="
                  transition-all
                  focus-visible:ring-ring
                  focus-visible:scale-[1.01]
                  group-hover:border-primary/40
                "
              />
            </div>

            {/* BUTTON */}
            <Button
              disabled={loading}
              onClick={onLogin}
              className="
                w-full h-11
                transition-all duration-200
                active:scale-[0.97]
                disabled:opacity-70
              "
            >
              {loading ? "Signing in…" : "Continue"}
            </Button>
          </div>

          {/* ACTION ROW */}
          <div className="flex items-center justify-between">
            <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Forgot password?
            </button>

            <span className="text-xs text-muted-foreground">
              Secure login
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-10 text-xs text-muted-foreground text-center">
          © 2025 YourCompanyName. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
