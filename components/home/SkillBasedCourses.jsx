"use client";

import React from "react";
import { cn } from "@/lib/utils";
import SkillBasedCard from "@/components/shared/SkillBasedCard";
import { useQuery } from "@tanstack/react-query";
import courseService from "@/services/courseService";
import { Skeleton } from "@/components/shared/Skeleton";

const SkillBasedCardSkeleton = () => (
  <div className="bg-white rounded-[42px] border border-[#D9D9D9] flex flex-col items-center text-center w-full sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[430px] overflow-hidden">
    {/* Image Skeleton */}
    <Skeleton className="relative w-full aspect-16/10 rounded-none" />
    
    {/* Content Skeleton */}
    <div className="flex flex-col items-center gap-5 p-6 md:p-8 w-full">
      <Skeleton className="h-7 w-3/4 rounded-md" />
      
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-7 w-16 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
      
      <Skeleton className="h-6 w-32 rounded-md mt-2" />
    </div>
  </div>
);

const STATIC_PATHS = [
  {
    title: "Hospitality Industry SOPs",
    rating: 4.7,
    badge: "Best Selling Category",
    personImage: "/sample-course.png"
  },
  {
    title: "Hospitality Industry SOPs",
    rating: 4.7,
    badge: "Best Selling Category",
    personImage: "/sample-course.png"
  },
  {
    title: "Hospitality Industry SOPs",
    rating: 4.7,
    badge: "Best Selling Category",
    personImage: "/sample-course.png"
  }
];

const SkillBasedCourses = ({ className, initialData }) => {
  const { data: coursesData, isLoading } = useQuery({
    queryKey: ["all-courses"],
    queryFn: () => courseService.getCourses(),
    staleTime: 5 * 60 * 1000,
    initialData,
  });


  const learningPaths = React.useMemo(() => {
    if (!coursesData || !Array.isArray(coursesData)) return STATIC_PATHS;
    
    // Filter by trending key (should be 1) and limit to max 3
    const trending = coursesData
      .filter(course => Number(course.trending) === 1)
      .slice(0, 3);

      
    if (trending.length === 0) return STATIC_PATHS;

    return trending.map(course => ({
      title: course.title,
      rating: course.avg_rating || 4.5,
      badge: course.category_names?.split(',')[0] || "Skill Based",
      personImage: course.image || "/sample-course.png"
    }));
  }, [coursesData]);

  // If we have no data and it's not loading, and we don't want to show static paths, we could return null.
  // But for now, we follow the pattern of showing something.

  return (
    <section className={cn("w-full", className)}>
      <div className="container mx-auto flex flex-col gap-10">
        <h2 className="text-text-main">
          Skill-Based <span className="text-primary">Learning Paths</span>
        </h2>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible gap-6 md:gap-8 xl:gap-10 2xl:gap-12 snap-x snap-mandatory pb-6 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 flex justify-center snap-center">
                <SkillBasedCardSkeleton />
              </div>
            ))
          ) : (
            learningPaths.map((path, index) => (
              <div key={index} className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 flex justify-center snap-center">
                <SkillBasedCard {...path} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillBasedCourses;
