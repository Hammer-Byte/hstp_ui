'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const onboardingSteps = [
  {
    id: 1,
    title: "Train for Exceptional Hospitality.",
    description: "Learn hotel operations, service standards, and guest experience skills anytime.",
    image: "/expert-1.png",
  },
  {
    id: 2,
    title: "Master Hotel SOPs & Safety.",
    description: "Stay updated on service protocols, safety rules, and compliance training.",
    image: "/expert-2.png",
  },
  {
    id: 3,
    title: "Learn. Certify. Lead.",
    description: "Earn certifications, upgrade skills, and become a trainer for hotel teams.",
    image: "/expert-3.png",
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleBrowseCourse = () => {
    router.push('/');
  };

  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <div className="fixed inset-0 bg-[#673AB7] flex flex-col items-center overflow-hidden select-none font-dm-sans">
      
      {/* Background Graphic Patterns */}
      <div className="absolute top-[30%] right-[-100px] w-[500px] h-[500px] rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full border border-white/10 pointer-events-none" />

      {/* Top Indicators */}
      <div className="w-full px-10 pt-16 flex gap-5 z-10 items-center">
        {onboardingSteps.map((_, idx) => (
          <div 
            key={idx}
            className={`transition-all duration-300 rounded-full flex-1 h-[8px] ${
              idx <= currentStep 
                ? 'bg-white' 
                : 'bg-transparent border border-white'
            }`}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col px-5 pt-12 z-10">
        <h1 className="text-[32px] font-medium leading-[1.15] mb-4 text-white tracking-tight">
          {step.title}
        </h1>
        <p className="text-[18px] font-normal text-white/90 leading-[1.4] mb-2 max-w-[95%]">
          {step.description}
        </p>

        {/* Hero Illustration */}
        <div className="relative w-full h-[410px] flex items-center justify-center">
          <div className="relative w-[90%] h-[90%]">
            <Image
              src={step.image}
              alt="expert-graphic"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-[230px] w-full max-w-md px-10 flex items-center justify-between z-10 text-white">
        <div className="flex-1">
          {currentStep > 0 && (
            <button 
              onClick={handleBack}
              className="flex items-center gap-3 active:opacity-70 transition-opacity"
            >
              <div className="w-14 h-14 rounded-full border-[1.5px] border-white flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-xl font-normal">Back</span>
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {currentStep < onboardingSteps.length - 1 && (
            <button 
              onClick={handleNext}
              className="flex items-center gap-3 active:opacity-70 transition-opacity"
            >
              <span className="text-xl font-normal text-nowrap">Let&apos;s Walk</span>
              <div className="w-14 h-14 rounded-full border-[1.5px] border-white flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Actions Container */}
      <div className="absolute bottom-8 w-full max-w-md px-8 z-20 flex flex-col items-center gap-6">
        {/* Get Started Button - Always present, anchor for the bottom */}
        <button 
          onClick={handleGetStarted}
          className="w-full h-20 bg-[#FFC107] text-[#1A1A1A] font-bold text-2xl rounded-[35px] shadow-[0_10px_0_0_#000000] border-b-2 border-black/10 active:translate-y-[4px] active:shadow-[0_6px_0_0_#000000] transition-all"
        >
          Get Started
        </button>

        {/* Browse Course Button - Conditionally rendered below Get Started */}
        {isLastStep && (
          <button 
            onClick={handleBrowseCourse}
            className="text-white text-2xl font-medium active:opacity-60 transition-opacity mb-4"
          >
            Browse Course
          </button>
        )}
      </div>
    </div>
  );
}
