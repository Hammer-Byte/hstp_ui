import React from "react";
import { Skeleton } from "./Skeleton";
import { cn } from "@/lib/utils";

const CategoryCourseCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[16px] border p-3.5 flex flex-col gap-4 w-full border-[#E2E8F0]">
      {/* Image Section Skeleton */}
      <Skeleton className="aspect-16/10 w-full rounded-[12px]" />

      {/* Content Section Skeleton */}
      <div className="flex flex-col flex-1 gap-2.5">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4 mt-2" />
        </div>

        {/* Rating & reviews count Skeleton */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-3.5 h-3.5 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-3 w-8" />
        </div>

        {/* Badges Row Skeleton */}
        <div className="flex flex-wrap gap-2 mt-1">
          <Skeleton className="h-6 w-20 rounded-[4px]" />
          <Skeleton className="h-6 w-20 rounded-[4px]" />
        </div>

        {/* Price Row Skeleton */}
        <div className="flex items-baseline gap-2 pt-1 mt-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Action Button Skeleton */}
        <Skeleton className="w-full h-10 md:h-11 lg:h-11 xl:h-12 2xl:h-12 rounded-[10px] mt-2" />
      </div>
    </div>
  );
};

export default CategoryCourseCardSkeleton;
