"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn, getImageUrl } from "@/lib/utils";

const TestimonialCard = ({ 
  image, 
  name, 
  user_name,
  role, 
  rating, 
  ratings,
  content, 
  testimonial,
  className 
}) => {
  const displayName = user_name || name || "Student";
  const displayRating = ratings || rating || 0;
  const displayContent = testimonial || content || "";
  return (
    <div className={cn(
      "bg-white rounded-[2rem] border border-[#E9E9E9] p-8 flex flex-col gap-6 w-[350px] sm:w-[380px] shrink-0 transition-all hover:shadow-xl hover:shadow-primary/5",
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="relative lg:w-16 lg:h-16 xl:w-17 xl:h-17 2xl:w-18 2xl:h-18 rounded-full overflow-hidden">
          <Image
            src={getImageUrl(image) || "/sample-course.png"}
            alt={displayName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="lg:text-[18px] xl:text-[19px] 2xl:text-[20px] font-semibold text-[#1A1A1A] leading-tight m-0">{displayName}</h4>
          {role && (
            <p className="lg:text-[14px] xl:text-[15px] 2xl:text-[16px] text-[#1A1A1A] font-medium">{role}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-0.5 md:gap-1">
          {[...Array(5)].map((_, i) => {
            const fillLevel = Math.max(0, Math.min(1, displayRating - i));
            return (
              <div key={i} className="relative">
                <Star className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-5 xl:h-5 text-gray-200 fill-gray-200" />
                <div 
                  className="absolute inset-0 overflow-hidden" 
                  style={{ width: `${fillLevel * 100}%` }}
                >
                  <Star className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-5 xl:h-5 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            );
          })}
        </div>
        <span className="text-[15px] font-semibold text-[#1A1A1A]">{Number(displayRating).toFixed(1)}</span>
      </div>

      <p className="lg:text-[15px] xl:text-[16px] text-[#1A1A1A] leading-relaxed line-clamp-2">
        &quot;{displayContent}&quot;
      </p>
    </div>
  );
};

export default TestimonialCard;
