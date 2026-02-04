"use client";

import React from "react";
import Image from "next/image";
import { Star, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CourseCard = ({ 
  image, 
  title, 
  author, 
  rating = 0, 
  reviewsCount = 0, 
  price, 
  badgeText,
  isWishlisted = false,
  isSelected = false,
  className
}) => {
  return (
    <div className={cn(
      "group bg-white rounded-[24px] border p-3 transition-all hover:shadow-xl hover:shadow-gray-200/50 flex flex-col gap-4 w-[290px] h-[450px] shrink-0",
      "border-[#D9D9D9]",
      className
    )}>
      {/* Image Section */}
      <div className="relative aspect-16/10 w-full rounded-[20px] overflow-hidden shrink-0">
        <Image
          src={"/sample-course.png"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Wishlist Button */}
        <Button 
          variant="ghost" 
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-red-500 p-0 transition-all active:scale-90"
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current text-red-500")} />
        </Button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 gap-2.5">
        <div className="space-y-1">
          <h3 className="text-[18px] font-bold text-text-main leading-tight line-clamp-2 min-h-[50px]">
            {title}
          </h3>
          <p className="text-[12px] text-text-shaded font-medium">by {author}</p>
        </div>

        {/* Rating & Badge Row */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(rating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "fill-gray-200 text-gray-200"
                )} 
              />
            ))}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-text-shaded">
            <Users className="w-3 h-3" />
            <span>({reviewsCount})</span>
          </div>
        </div>

        {/* Price & Badge Row */}
        <div className="flex items-center justify-between pt-2">
          {badgeText && (
            <Badge className="px-4 py-1.5 bg-[#FFF9C4] text-[#F9A825] text-[12px] font-bold rounded-lg border border-[#FFF59D] hover:bg-[#FFF59D] transition-colors">
              {badgeText}
            </Badge>
          )}
          <div className="text-[20px] font-bold text-text-main">
            ₹ {price}/-
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-[16px] font-bold rounded-full mt-2 transition-all active:scale-[0.98]">
          Purchase
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
