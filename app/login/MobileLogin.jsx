"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

export default function MobileLogin() {
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
      const isNewUser = true; // Simulating new user for now
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
    <div className="fixed inset-0 z-100 flex flex-col bg-[#D6E6FF] font-dm-sans overflow-y-auto">
      {/* Dynamic Header Image */}
      <div className="relative w-full aspect-[1/0.75] flex items-start justify-center overflow-hidden shrink-0 transition-all duration-500">
        <div className="relative w-full h-full">
          <Image
            src={step === 'signup' ? "/sign-up-mobile.png" : "/login.png"}
            alt="Step illustration"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Main Form Card */}
      <div className="flex-1 bg-white rounded-t-[40px] -mt-10 pt-10 px-8 pb-10 shadow-2xl z-10 min-h-[550px] transition-all">
        <div className="flex flex-col h-full items-center">
          
          <div className="flex items-center justify-between mb-8 w-full">
            {(step === "otp" || step === "signup") && (
              <button onClick={() => setStep(step === "signup" ? "otp" : "email")} className="text-[#673AB7] active:scale-90 transition-transform">
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-[32px] font-bold text-[#673AB7] flex-1 text-center whitespace-nowrap px-4">
              {step === "email" ? "Login" : step === "otp" ? "Verify OTP" : "Setup Profile"}
            </h1>
            {(step === "otp" || step === "signup") && <div className="w-6" />}
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="w-full space-y-6">
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#1A1A1A] block ml-1">E-mail :</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your e-mail"
                    required
                    className="h-14 pl-12 rounded-[12px] border-none bg-[#F5F5F5] placeholder:text-[#B0B0B0] text-base focus-visible:ring-2 focus-visible:ring-[#673AB7] font-medium"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-15 rounded-full bg-[#673AB7] text-[#FFFFFF] text-[20px] font-bold shadow-lg shadow-[#673AB7]/30 hover:bg-[#5E35A6] transition-all active:scale-[0.98] mt-4"
              >
                Send OTP
              </Button>

              <div className="flex flex-col items-center gap-6 pt-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="h-px bg-gray-100 flex-1" />
                  <span className="text-[12px] font-bold text-gray-400 font-dm-sans">OR</span>
                  <div className="h-px bg-gray-100 flex-1" />
                </div>

                <button
                  type="button"
                  className="w-full h-16 flex items-center justify-center gap-4 rounded-full bg-[#F5F5F5] hover:bg-gray-100 transition-colors border-none active:scale-[0.98]"
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
                <p className="text-[14px] font-medium text-gray-500">We have sent a 6-digit OTP to</p>
                <p className="text-[16px] font-bold text-[#1A1A1A]">{email}</p>
              </div>

              <div className="flex justify-between gap-2 px-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpRefs.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-14 bg-[#F5F5F5] border-none rounded-[12px] text-center text-xl font-bold text-[#673AB7] focus:ring-2 focus:ring-[#673AB7] outline-none transition-all shadow-sm"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={otp.some(d => !d) || isLoginLoading}
                  className="w-full h-15 rounded-full bg-[#673AB7] text-[#FFFFFF] text-[20px] font-bold shadow-lg shadow-[#673AB7]/30 hover:bg-[#5E35A6] transition-all active:scale-[0.98]"
                >
                  Verify & Continue
                </Button>
                
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[12px] font-medium text-gray-500">Didn&apos;t receive the OTP?</p>
                  <button type="button" className="text-[14px] font-bold text-[#673AB7] hover:underline">
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
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]">
                    <User className="h-5 w-5" />
                  </div>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="h-14 pl-12 rounded-[12px] border-none bg-[#F5F5F5] placeholder:text-[#B0B0B0] text-base focus-visible:ring-2 focus-visible:ring-[#673AB7] font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-bold text-[#1A1A1A] block ml-1">E-mail :</label>
                <div className="relative group opacity-60">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    type="email"
                    value={email}
                    disabled
                    className="h-14 pl-12 rounded-[12px] border-none bg-[#E0E0E0] text-base font-medium cursor-not-allowed"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4CAF50]">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked)}
                  className="w-5 h-5 rounded-[6px] border-gray-200 data-[state=checked]:bg-[#673AB7] data-[state=checked]:border-[#673AB7]"
                />
                <label htmlFor="terms" className="text-[12px] font-medium text-gray-500 cursor-pointer select-none leading-tight">
                  I agree to the <span className="font-bold text-[#1A1A1A]">Terms & Conditions</span> and <span className="font-bold text-[#1A1A1A]">Privacy Policy</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={!name || !agreedToTerms}
                className="w-full h-15 rounded-full bg-[#673AB7] text-[#FFFFFF] text-[20px] font-bold shadow-lg shadow-[#673AB7]/30 hover:bg-[#5E35A6] transition-all active:scale-[0.98] mt-2"
              >
                Create Account
              </Button>
            </form>
          )}

          <div className="mt-auto pt-10 flex justify-center">
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
