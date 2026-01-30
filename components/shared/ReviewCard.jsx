"use client";

import React from "react";
import Image from "next/image";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const ReviewCard = ({ 
  userImage, 
  userName, 
  rating, 
  comment, 
  timeAgo,
  className 
}) => {
  return (
    <div>
    <div className={cn(
      "bg-white rounded-[12px] border border-gray-200 p-5 flex flex-col gap-4 w-[260px] h-[130px] shrink-0",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <Image 
            src={userImage || "/avatar-placeholder.png"} 
            alt={userName} 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-text-main leading-tight">{userName}</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-2.5 h-2.5",
                    i < Math.floor(rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "fill-gray-200 text-gray-200"
                  )} 
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-text-main">{rating}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-[14px] font-semibold text-text-main line-clamp-2 leading-tight">
          {comment}
        </p>
        <p className="text-[10px] text-text-shaded font-medium">{timeAgo}</p>
      </div>
    </div>
    <div className="mt-auto flex items-center gap-1 text-[10px] text-text-shaded font-medium pt-2 border-t border-gray-50">
        <span>Helpful</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" className="h-[20px] w-[20px] p-0 hover:bg-transparent hover:text-primary transition-colors">
            <ThumbsUp className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" className="h-[20px] w-[20px] p-0 hover:bg-transparent hover:text-red-500 transition-colors">
            <ThumbsDown className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
    
  );
};

export default ReviewCard;
