"use client";

import React from "react";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SkillBasedCard = ({ title, rating, badge, bgColor, personImage, className }) => {
  return (
    <div className={cn(
      "group bg-white rounded-[42px] border border-[#D9D9D9] flex flex-col w-full sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[430px] transition-all hover:shadow-xl hover:shadow-primary/5",
      className
    )}>
      {/* Top Section with Background Color and Person */}
      <div className={cn(
        "relative w-full aspect-4/2 rounded-[42px] overflow-visible flex items-end justify-center",
        bgColor
      )}>
        {/* Background Graphic Pattern (Simplified) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none p-6">
           {/* Mocking the icon in the background */}
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20,80 L20,40 L40,40 L40,80 Z M60,80 L60,20 L80,20 L80,80 Z" />
            </svg>
        </div>
        
        <div className="relative w-full h-[120%] bottom-0">
          <Image
            src={personImage || "/expert.svg"}
            alt="Skill Expert"
            fill
            className="object-contain object-bottom transition-transform duration-500 group-hover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-xl md:text-[22px] lg:text-[24px] font-medium text-text-main leading-tight m-0">
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#434343] rounded-full">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-[14px] font-medium text-text-main">{rating}</span>
          </div>
          <div className="px-4 py-1 bg-white border border-[#434343] rounded-full">
            <span className="text-[11px] md:text-[12px] font-semibold text-[#4A4A4A] whitespace-nowrap">
              {badge}
            </span>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 text-[16px] font-bold text-text-main hover:text-primary transition-all group/btn mt-2">
            Go to course
            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default SkillBasedCard;
