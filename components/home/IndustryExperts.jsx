"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Award, Zap, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const ExpertBadge = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-gray-100">
    <div className="flex items-center justify-center w-5 h-5 text-primary">
      <Icon className="w-full h-full" strokeWidth={3} />
    </div>
    <span className="text-[13px] font-bold text-[#1A1A1A] whitespace-nowrap">{text}</span>
  </div>
);

const IndustryExperts = ({ className }) => {
  return (
    <section className={cn("w-full py-12", className)}>
      <div className="container mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-text-main m-0">
            Learn From <span className="text-primary">Industry Experts</span>
          </h2>
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all cursor-pointer text-[15px]">
            Browse all course <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Banner Box */}
        <div className="relative w-full bg-linear-to-b from-[#0F0F0F] to-[#0D0024] rounded-[3rem] overflow-hidden min-h-[420px] lg:min-h-[480px] flex items-center p-8 md:p-12 lg:p-16">
          {/* Background Glow */}
          <div className="absolute top-[-40%] left-[-10%] w-[60%] h-[180%] bg-primary/25 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 w-full lg:max-w-[65%] flex flex-col gap-10">
            <h3 className="text-[36px] md:text-[52px] font-semibold bg-gradient-to-r from-[#FCFAFF] via-[#B19ADB] via-[#8C6AC9] to-[#D0B5FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(176,154,219,0.35)] leading-none tracking-tight">
              Authority & credibility
            </h3>

            {/* Badges */}
            <div className="flex flex-wrap gap-5">
              <ExpertBadge icon={Award} text="Experienced professionals" />
              <ExpertBadge icon={Zap} text="Real-world case studies" />
              <ExpertBadge icon={BookOpen} text="Practical teaching approach" />
            </div>

            <p className="text-[20px] md:text-[26px] font-medium text-white leading-snug max-w-[600px] opacity-90">
              Learn directly from experienced hospitality professionals with real-world expertise.
            </p>

            <Button className="w-44 h-14 bg-primary hover:bg-primary text-[18px] font-semibold rounded-full transition-all active:scale-[0.98] shadow-xl shadow-primary/30">
              More Info
            </Button>
          </div>

          {/* Expert Image */}
          <div className="absolute right-[-2%] bottom-0 h-full w-[45%] lg:w-[48%] pointer-events-none">
            <Image
              src="/expert.svg"
              alt="Industry Expert"
              fill
              className="object-contain object-bottom scale-105 lg:scale-135 origin-bottom translate-y-4"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryExperts;
