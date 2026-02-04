"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TestimonialCard = ({ image, name, role, rating, content, className }) => {
  return (
    <div className={cn(
      "bg-white rounded-[2rem] border border-[#E9E9E9] p-8 flex flex-col gap-6 w-[350px] sm:w-[380px] shrink-0 transition-all hover:shadow-xl hover:shadow-primary/5",
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/10">
          <Image
            // src={image || "/sample-course.png"}
            src={"/sample-course.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[18px] font-bold text-[#1A1A1A] leading-tight">{name}</h4>
          <p className="text-[14px] text-gray-500 font-medium italic">{role}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-0.5 md:gap-1">
                {[...Array(5)].map((_, i) => {
                  const fillLevel = Math.max(0, Math.min(1, rating - i));
                  return (
                    <div key={i} className="relative">
                      <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-200 fill-gray-200" />
                      <div 
                        className="absolute inset-0 overflow-hidden" 
                        style={{ width: `${fillLevel * 100}%` }}
                      >
                        <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
        <span className="text-[15px] font-bold text-[#1A1A1A]">{rating}</span>
      </div>

      <p className="text-[15px] text-[#4A4A4A] leading-relaxed line-clamp-4">
        &quot;{content}&quot;
      </p>
    </div>
  );
};

export default TestimonialCard;
