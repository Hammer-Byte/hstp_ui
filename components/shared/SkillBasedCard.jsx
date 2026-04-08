"use client";

import React from "react";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SkillBasedCard = ({ title, rating, badge, personImage, className }) => {
  return (
    <div className={cn(
      "group bg-white rounded-[42px] border border-[#D9D9D9] flex flex-col items-center text-center w-full sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[430px] transition-all hover:shadow-xl hover:shadow-primary/5 overflow-hidden",
      className
    )}>
      {/* Top Section - Simple Full-bleed Image */}
      <div className="relative w-full aspect-16/10 shrink-0">
        <Image
          src={personImage || "/sample-course.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center gap-5 p-6 md:p-8 w-full">
        <h3 className="text-xl md:text-[22px] lg:text-[24px] font-semibold text-text-main leading-tight m-0">
          {title}
        </h3>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#D9D9D9] rounded-full">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-[13px] font-bold text-text-main">{rating}</span>
          </div>
          <div className="px-4 py-1 bg-white border border-[#D9D9D9] rounded-full">
            <span className="text-[11px] md:text-[12px] font-semibold text-[#5F5F5F] whitespace-nowrap">
              {badge}
            </span>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 text-[16px] font-bold text-text-main hover:text-primary transition-all group/btn mt-2 cursor-pointer bg-transparent border-none">
            Go to course
            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default SkillBasedCard;
