"use client";

import React from "react";
import Image from "next/image";
import { Star, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getImageUrl } from "@/lib/utils";

import { useRouter } from "next/navigation";

const CourseCard = ({ 
  id,
  image, 
  title, 
  author, 
  rating, 
  reviewsCount, 
  price, 
  badgeText,
  isWishlisted = false,
  isSelected = false,
  className
}) => {
  const router = useRouter();

  return (
    <div className={cn(
      "group bg-white rounded-[24px] border p-3 transition-all hover:shadow-xl hover:shadow-gray-200/50 flex flex-col gap-4 md:w-[300px] lg:w-[350px] xl:w-[370px] 2xl:w-[400px] h-[400px] md:h-[430px] lg:h-[470px] xl:h-[480px] 2xl:h-[510px] shrink-0",
      "border-[#D9D9D9]",
      className
    )}>
      {/* Image Section */}
      <div className="relative aspect-16/10 w-full rounded-[20px] overflow-hidden shrink-0">
        <Image
          src={getImageUrl(image) || "/sample-course.png"}
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
          <h3 className="2xl:text-[22px] xl:text-[21px] lg:text-[20px] md:text-[18px] font-medium text-text-main leading-tight line-clamp-2 min-h-[50px]">
            {title}
          </h3>
          {author && (
            <p className="2xl:text-[15px] xl:text-[14px] lg:text-[13px] md:text-[12px] text-text-shaded font-medium">by {author}</p>
          )}
        </div>

        {/* Rating Row */}
        {(rating > 0 || reviewsCount > 0) && (
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "2xl:w-4.5 2xl:h-4.5",
                    i < Math.floor(rating || 0) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "fill-gray-200 text-gray-200"
                  )} 
                />
              ))}
            </div>
            {reviewsCount > 0 && (
              <div className="flex items-center gap-1 2xl:text-[14px] xl:text-[13px] lg:text-[12px] md:text-[11px] font-semibold text-text-shaded">
                <Users className="2xl:w-4 2xl:h-4 xl:w-3.5 xl:h-3.5 lg:w-3 lg:h-3" />
                <span>({reviewsCount})</span>
              </div>
            )}
          </div>
        )}

        {/* Price & Badge Row */}
        <div className="flex items-center justify-between pt-2">
          {badgeText && (
            <Badge className="px-3 py-1 bg-[#E3D4FF] text-primary text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]  font-semibold rounded-sm border border-[#E3D4FF] hover:bg-[#E3D4FF] transition-colors">
              {badgeText}
            </Badge>
          )}
          <div className="lg:text-[22px] xl:text-[23px] 2xl:text-[24px] font-semibold text-text-main">
            ₹ {price}/-
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full h-12 bg-primary hover:bg-primary/90 md:text-[16px] xl:text-[17px] lg:text-[18px] font-bold rounded-full mt-2 transition-all active:scale-[0.98]"
          onClick={() => router.push(`/course-details/${id || '1'}`)}
        >
          Explore
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
