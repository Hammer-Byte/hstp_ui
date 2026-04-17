"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const [step, setStep] = useState("email"); // 'email' | 'otp' | 'signup'
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const otpRefs = useRef([]);
  const { isLoginLoading } = useAuth();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (email) {
      setStep("otp");
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      // Simulate checking if user exists
      const isNewUser = true; 
      if (isNewUser) {
        setStep("signup");
      } else {
        console.log("Existing user logged in");
      }
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (name && agreedToTerms) {
      console.log("Account created for:", { name, email });
    }
  };

  return (
    <div className="flex flex-col justify-center px-4 lg:px-24 bg-background font-dm-sans min-h-[600px]">
      <div className="mx-auto w-full max-w-md space-y-10">
        <div className="text-center relative">
          {(step === "otp" || step === "signup") && (
            <button 
              onClick={() => setStep(step === "signup" ? "otp" : "email")} 
              className="absolute left-0 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/5 p-2 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-[32px] font-bold tracking-tight text-[#1A1A1A]">
            {step === "email" ? "Login with e-mail" : step === "otp" ? "Verify OTP" : "Complete Profile"}
          </h1>
        </div>

        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1A1A1A] block ml-1">E-mail :</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your e-mail"
                  required
                  className="h-14 pl-12 rounded-[12px] border-none bg-[#F5F5F5] placeholder:text-[#B0B0B0] text-base focus-visible:ring-2 focus-visible:ring-primary font-medium shadow-sm transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoginLoading || !email}
              className="w-full h-15 rounded-full bg-primary text-white text-[20px] font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] mt-4"
            >
              Send OTP
            </Button>

            <div className="relative flex items-center gap-4 py-2">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground font-bold italic">OR</span>
              <Separator className="flex-1" />
            </div>

            <div className="flex justify-center">
              <button 
                type="button" 
                className="flex items-center justify-center gap-3 w-full h-15 rounded-full border border-gray-100 bg-white shadow-sm hover:bg-gray-50 transition-all hover:shadow-md active:scale-[0.98]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-[18px] font-bold text-[#1A1A1A]">Continue with Google</span>
              </button>
            </div>
          </form>
        ) : step === "otp" ? (
          <form onSubmit={handleVerifyOtp} className="w-full space-y-8">
            <div className="text-center space-y-2">
              <p className="text-[16px] font-medium text-gray-500">We have sent a 6-digit OTP to</p>
              <p className="text-[18px] font-bold text-[#1A1A1A]">{email}</p>
            </div>

            <div className="flex justify-between gap-3 max-w-sm mx-auto">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 bg-[#F5F5F5] border-none rounded-[12px] text-center text-xl font-bold text-primary focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            <div className="space-y-6 pt-4">
              <Button
                type="submit"
                disabled={otp.some(d => !d) || isLoginLoading}
                className="w-full h-15 rounded-full bg-primary text-white text-[20px] font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                Verify & Continue
              </Button>
              
              <div className="flex flex-col items-center gap-3">
                <p className="text-[14px] font-medium text-gray-500">Didn&apos;t receive the OTP?</p>
                <button type="button" className="text-[16px] font-bold text-primary hover:underline">
                  Resend Code
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1A1A1A] block ml-1">Full Name :</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="h-14 pl-12 rounded-[12px] border-none bg-[#F5F5F5] placeholder:text-[#B0B0B0] text-base focus-visible:ring-2 focus-visible:ring-primary font-medium shadow-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-[#1A1A1A] block ml-1">E-mail :</label>
              <div className="relative group opacity-70">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="h-14 pl-12 rounded-[12px] border-none bg-gray-100 text-base font-medium cursor-not-allowed"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4CAF50]">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-3">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked)}
                className="w-5 h-5 rounded-[6px] border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="terms" className="text-[14px] font-medium text-gray-500 cursor-pointer select-none">
                I agree to the <span className="font-bold text-[#1A1A1A]">Terms & Conditions</span> and <span className="font-bold text-[#1A1A1A]">Privacy Policy</span>
              </label>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={!name || !agreedToTerms}
                className="w-full h-15 rounded-full bg-primary text-white text-[20px] font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                Create Account
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
