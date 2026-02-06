"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/app/hooks/useWindowSize";

const ExpertBadge = ({ iconText, text }) => {
  const {width, height} = useWindowSize();
  return (<div className="flex flex-col items-start gap-0">
     {width > 1150 && 
      <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-[78px] lg:h-[78px]">
        <Image
          src={iconText}
          alt="Expert"
          fill
          className="object-contain pl-1"
        />
      </div>
      }
    <div className="flex items-center bg-white px-3 md:px-4 lg:px-3.5 xl:px-5 py-1.5 md:py-2.5 rounded-full shadow-lg border border-gray-100">
      <span className="text-[10px] md:text-[11px] lg:text-[13px] font-semibold text-text-main whitespace-nowrap leading-none">
        {text}
      </span>
    </div>
  </div>)
};

const IndustryExperts = ({ className }) => {
  return (
    <section className={cn("w-full", className)}>
      <div className="container mx-auto flex flex-col gap-4">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-text-main m-0">
            Learn From <span className="text-primary">Industry Experts</span>
          </h2>
        </div>

        {/* Banner Box */}
        <div className="relative w-full bg-linear-to-b from-[#0F0F0F] to-[#0D0024] rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[520px] md:min-h-[400px] lg:min-h-[460px] flex items-center p-6 md:p-10 lg:p-12 xl:p-16">
          {/* Background Glow */}
          <div className="absolute top-[-40%] left-[-10%] w-[80%] md:w-[60%] h-[180%] bg-primary/25 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 w-full md:max-w-[60%] lg:max-w-[65%] flex flex-col md:gap-6 lg:gap-8 xl:gap-10">
            <h3 className="font-semibold bg-linear-to-r from-[#FCFAFF] via-[#8C6AC9] via-18% to-[#D0B5FF] to-70% bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(176,154,219,0.35)] leading-tight md:leading-none tracking-tight m-0 text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] xl:text-[42px]">
              Authority & credibility
            </h3>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 lg:gap-3.5 xl:gap-5">
              <ExpertBadge iconText="/expert-1.svg" text="Experienced professionals" />
              <ExpertBadge iconText="/expert-2.svg" text="Real-world case studies" />
              <ExpertBadge iconText="/expert-3.svg" text="Practical teaching approach" />
            </div>

            <p className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[22px] font-medium text-white leading-snug max-w-[600px] opacity-90">
              Learn directly from experienced hospitality professionals with real-world expertise.
            </p>

            <Button className="w-36 h-12 md:w-44 md:h-14 bg-primary hover:bg-primary text-[14px] md:text-[18px] font-semibold rounded-full transition-all active:scale-[0.98] shadow-xl shadow-primary/30">
              More Info
            </Button>
          </div>

          {/* Expert Image */}
          <div className="absolute right-[-10%] sm:right-0 md:right-[-2%] lg:right-[10px] xl:right-[-2%] bottom-0 h-[60%] sm:h-[70%] md:h-[85%] lg:h-[74%] w-[60%] sm:w-[50%] md:w-[45%] lg:w-[36%] xl:w-[48%] pointer-events-none opacity-50 md:opacity-100">
            <Image
              src="/expert.svg"
              alt="Industry Expert"
              fill
              className="object-contain object-bottom scale-100 sm:scale-105 md:scale-105 lg:scale-135 origin-bottom translate-y-4"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryExperts;
