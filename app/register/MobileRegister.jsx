"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function MobileRegister({ onRegister, loading }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    onRegister(data);
  };

  return (
    <div className="fixed inset-0 z-100 flex flex-col bg-[#D6E6FF] font-poppins overflow-y-auto">
      {/* Top Illustration Area */}
      <div className="relative w-full aspect-[1/0.85] flex items-start justify-center overflow-hidden shrink-0">
        <div className="relative w-full h-full">
          <Image
            src="/sign-up-mobile.png"
            alt="Sign up illustration"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Sign Up Card */}
      <div className="flex-1 bg-white rounded-t-[40px] -mt-10 pt-10 px-8 pb-10 shadow-2xl z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-[32px] font-bold text-[#673AB7] mb-8">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1A1A1A] block ml-1">
                Name :
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Enter your name"
                  className="h-14 pl-12 rounded-[12px] border-none bg-[#F5F5F5] placeholder:text-[#B0B0B0] text-base focus-visible:ring-1 focus-visible:ring-[#673AB7]"
                />
              </div>
              {errors.name && (
                <p className="text-xs font-medium text-destructive ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1A1A1A] block ml-1">
                E-mail :
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your e-mail"
                  className="h-14 pl-12 rounded-[12px] border-none bg-[#F5F5F5] placeholder:text-[#B0B0B0] text-base focus-visible:ring-1 focus-visible:ring-[#673AB7]"
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-destructive ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1A1A1A] block ml-1">
                Password :
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-14 pl-12 pr-12 rounded-[12px] border-none bg-[#F5F5F5] placeholder:text-[#B0B0B0] text-base focus-visible:ring-1 focus-visible:ring-[#673AB7]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#808080]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-destructive ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-15 rounded-full bg-[#673AB7] text-[#FFFFFF] text-[20px] font-bold shadow-lg shadow-[#673AB7]/30 hover:bg-[#5E35A6] transition-all active:scale-[0.98] mt-4"
            >
              {loading ? "Loading..." : "Continue"}
            </Button>

            <div className="flex justify-center pt-2">
              <p className="text-[12px] font-medium text-[#1A1A1A]">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-[#673AB7]">
                  Login
                </Link>
              </p>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              className="w-full h-16 flex items-center justify-center gap-4 rounded-full bg-[#F5F5F5] hover:bg-gray-100 transition-colors border-none"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <span className="text-[18px] font-bold text-[#1A1A1A]">
                Continue with Google
              </span>
            </button>
          </form>

          {/* Help Link */}
          <div className="mt-auto pt-10">
            <Link
              href="#"
              className="flex items-center gap-2 text-[14px] font-bold text-[#1A1A1A] hover:text-[#673AB7] transition-colors group"
            >
              Need any help
              <ArrowRight className="w-4 h-4 text-[#673AB7] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
