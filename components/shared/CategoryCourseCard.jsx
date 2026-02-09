"use client";

import React from "react";
import Image from "next/image";
import { Star, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CategoryCourseCard = ({ 
  image, 
  title, 
  author, 
  rating = 0, 
  reviewsCount = 0, 
  price, 
  originalPrice = "999",
  badgeText,
  isWishlisted = false,
  isSelected = false,
  showWishlist = true,
  className
}) => {
  return (
    <div className={cn(
      "group bg-white rounded-[16px] border p-3.5 transition-all hover:shadow-2xl flex flex-col gap-4 w-full",
      "border-[#E2E8F0]",
      className
    )}>
      {/* Image Section */}
      <div className="relative aspect-16/10 w-full rounded-[12px] overflow-hidden shrink-0">
        <Image
          src={image || "/sample-course.png"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Wishlist Button */}
        {showWishlist && (
          <Button 
            variant="ghost" 
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-red-500 p-0 transition-all active:scale-90"
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current text-red-500")} />
          </Button>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 gap-2.5">
        <div className="space-y-1">
          <h3 className="text-[18px] md:text-[20px] lg:text-[22px] 2xl:text-[24px] font-semibold text-[#1A1A1A] leading-tight line-clamp-2 min-h-[52px]">
            {title}
          </h3>
          <p className="text-[11px] md:text-[12px] lg:text-[13px] xl:text-[13px] 2xl:text-[14px] text-[#5F5F5F] font-semibold">by {author}</p>
        </div>

        {/* Rating & reviews count */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-3.5 h-3.5 2xl:w-4 2xl:h-4",
                  i < 4 // Matching the image which shows 4 stars
                    ? "fill-[#FFC107] text-[#FFC107]" 
                    : "fill-[#E0E0E0] text-[#E0E0E0]"
                )} 
              />
            ))}
          </div>
          <span className="text-[11px] md:text-[11px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] font-medium text-black">({reviewsCount})</span>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2">
          <Badge className="px-3 py-1 bg-[#E3D4FF] text-[#673AB7] text-[11px] md:text-[13px] lg:text-[13px] 2xl:text-[15px] font-semibold rounded-[4px] border-none hover:bg-[#E3D4FF]">
            Best Seller
          </Badge>
          <Badge className="px-3 py-1 bg-[#FFF6A2] text-[#CBB300] text-[11px] md:text-[13px] lg:text-[13px] 2xl:text-[15px] font-semibold rounded-[4px] border-none hover:bg-[#FFF4B0]">
            Popular
          </Badge>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 pt-1">
          <div className="text-[14px] md:text-[15px] lg:text-[16px] 2xl:text-[18px] text-[#9EA1A7] line-through font-semibold">
            ₹ {originalPrice}/-
          </div>
          <div className="text-[18px] md:text-[20px] lg:text-[22px] 2xl:text-[24px] font-bold text-[#1A1A1A]">
            ₹ {price}/-
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full h-10 md:h-11 lg:h-11 xl:h-12 2xl:h-12 bg-primary hover:bg-primary/90 text-[15px] md:text-[16px] font-semibold rounded-[10px] mt-1 transition-all">
          Purchase
        </Button>
      </div>
    </div>
  );
};

export default CategoryCourseCard;
