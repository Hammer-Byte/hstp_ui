import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z.boolean().optional(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoginLoading, loginError } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  });

  const termsValue = useWatch({
    control,
    name: "terms",
  });

  const onSubmit = (data) => {
    // Calling the centralized API mutation
    login(data);
  };

  return (
    <div className="flex flex-col justify-center px-4 lg:px-24 bg-background">
      <div className="mx-auto w-full max-w-md space-y-10">
        <div className="text-center m-0 pt-4 md:pt-0">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-[14px]">
            Login With e-mail
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 h-full flex flex-col justify-center">
          {/* EMAIL */}
          <div className="space-y-2">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter Your mail"
                className={`h-14 pl-12 rounded-md border-gray-200 bg-white shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base ${errors.email ? "border-destructive focus:ring-destructive" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-destructive ml-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className={`h-14 pl-12 pr-12 rounded-md border-gray-200 bg-white shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base ${errors.password ? "border-destructive focus:ring-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex="-1"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-destructive ml-1">{errors.password.message}</p>
            )}
          </div>

          {/* TERMS */}
          <div className="space-y-2">
            <div className="flex justify-center items-center space-x-3">
              <Checkbox 
                id="terms" 
                checked={termsValue}
                onCheckedChange={(checked) => setValue("terms", checked)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer select-none">
                I agree to the <span className="font-semibold text-foreground underline underline-offset-4">Terms & Conditions</span> and <span className="font-semibold text-foreground underline underline-offset-4">Privacy Policy</span>
              </label>
            </div>
            {/* {errors.terms && (
              <p className="text-xs text-center font-medium text-destructive">{errors.terms.message}</p>
            )} */}
          </div>

          {/* ERROR MESSAGE */}
          {loginError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium text-center">
              {loginError.message}
            </div>
          )}

          {/* BUTTONS */}
          <div className="space-y-4 pt-4">
            <Button
              type="submit"
              disabled={isLoginLoading}
              className="w-full h-14 rounded-2xl bg-primary text-white text-lg font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              {isLoginLoading ? "Logging in..." : "Continue"}
            </Button>

            <Link href="/register" className="block w-full">
              <Button
                variant="outline"
                type="button"
                className="w-full h-14 rounded-2xl border-primary text-primary hover:bg-primary/5 text-lg font-semibold transition-all active:scale-[0.98]"
              >
                Create a Account
              </Button>
            </Link>
          </div>

          {/* OR SEPARATOR */}
          <div className="relative">
           <div className="flex items-center gap-3 w-full">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground font-medium">OR</span>
              <Separator className="flex-1" />
            </div>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="flex justify-center">
            <button type="button" className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-all hover:shadow-md">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
