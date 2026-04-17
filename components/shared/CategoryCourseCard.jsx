"use client";

import React from "react";
import Image from "next/image";
import { Star, Heart, User, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getImageUrl } from "@/lib/utils";

import { useRouter } from "next/navigation";

const CategoryCourseCard = ({ 
  id,
  image, 
  title, 
  author, 
  rating, 
  reviewsCount, 
  price, 
  isWishlisted = false,
  showWishlist = false,
  className
}) => {
  const router = useRouter();

  return (
    <div className={cn(
      "group bg-white rounded-[24px] overflow-hidden transition-all flex flex-col gap-2 w-full border-none font-dm-sans py-0.5",
      className
    )}>
      {/* Image Section - Refined Proportions */}
      <div className="relative w-full aspect-[1.75/1] px-1">
        <div className="relative w-full h-full rounded-[20px] border-4 border-[#0095FF] overflow-hidden bg-[#F5F5F5]">
          <Image
            src={getImageUrl(image)}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Popular Badge - More Compact Overlay */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-[6px]">
             <div className="bg-white rounded-full p-0.5">
               <Flame className="w-3 h-3 text-[#FF4D00] fill-[#FF4D00]" />
             </div>
             <span className="text-white text-[12px] font-bold tracking-tight">Popular</span>
          </div>
        </div>

        {/* Wishlist Button - Small */}
        {showWishlist && (
          <Button 
            variant="ghost" 
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white p-0"
          >
            <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-current text-red-500")} />
          </Button>
        )}
      </div>

      {/* Content Section - Extremely Tight Spacing */}
      <div className="flex flex-col gap-1.5 px-3 pb-0.5">
        <div className="space-y-0 text-left">
          <h3 className="text-[17px] md:text-[19px] font-bold text-[#1A1A1A] leading-snug line-clamp-1">
            {title}
          </h3>
          {author && (
            <p className="text-[12px] md:text-[13px] text-[#717171] font-semibold italic">by {author}</p>
          )}
        </div>

        {/* Rating Row - Minimal */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(rating || 0)
                    ? "fill-[#FFB800] text-[#FFB800]" 
                    : "fill-[#E0E0E0] text-[#E0E0E0]"
                )} 
              />
            ))}
          </div>
          <div className="flex items-center gap-1 ml-0.5">
             <User className="w-3.5 h-3.5 text-[#1A1A1A] opacity-40" />
             <span className="text-[14px] font-bold text-[#1A1A1A]">({reviewsCount || 0})</span>
          </div>
        </div>

        {/* Action Row - Efficient use of space */}
        <div className="flex items-center gap-2 pt-1.5">
          <Button 
            className="flex-1 h-[48px] bg-[#673AB7] hover:bg-[#5E35A6] text-[17px] font-bold rounded-[14px] shadow-md shadow-primary/20 transition-all"
            onClick={() => router.push(`/course-details/${id || '1'}`)}
          >
            Explore
          </Button>
          <div className="text-[17px] md:text-[19px] font-black text-[#1A1A1A] whitespace-nowrap">
            ₹ {price}/-
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCourseCard;
