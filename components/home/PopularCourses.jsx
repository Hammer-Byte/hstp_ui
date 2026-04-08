"use client";

import React from "react";
import CourseCard from "@/components/shared/CourseCard";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/shared/Skeleton";
import { useQuery } from "@tanstack/react-query";
import categoryService from "@/services/categoryService";

const CourseCardSkeleton = () => (
  <div className="group bg-white rounded-[24px] border border-[#D9D9D9] p-3 flex flex-col gap-4 md:w-[300px] lg:w-[350px] xl:w-[370px] 2xl:w-[400px] h-[400px] md:h-[430px] lg:h-[470px] xl:h-[480px] 2xl:h-[510px] shrink-0">
    {/* Image Skeleton */}
    <Skeleton className="relative aspect-16/10 w-full rounded-[20px] overflow-hidden shrink-0" />

    {/* Content Skeleton */}
    <div className="flex flex-col flex-1 gap-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>

      {/* Rating Row Skeleton */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-4 w-12 rounded-md ml-auto" />
      </div>

      {/* Price Skeleton Row */}
      <div className="flex items-center justify-between mt-auto">
        <Skeleton className="h-8 w-24 rounded-sm" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>

      {/* Button Skeleton */}
      <Skeleton className="w-full h-12 rounded-full mt-2" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="w-full py-20 px-4 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
      <span className="text-3xl">📚</span>
    </div>
    <h3 className="text-xl font-semibold text-text-main mb-2">No courses found</h3>
    <p className="text-text-shaded max-w-md mb-8">
      We couldn&apos;t find any courses in this category at the moment. Please check back later or explore other categories.
    </p>
    <Button variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all">
      Explore All Categories
    </Button>
  </div>
);

const PopularCourses = ({ title, highlight, items: itemsProp = [], className }) => {
  const [activeTab, setActiveTab] = React.useState("");
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 });
  const tabsListRef = React.useRef(null);

  // Use React Query for the actual data
  const { data: categorizedData, isLoading, isError, error } = useQuery({
    queryKey: ["popular-categorized-courses"],
    queryFn: () => categoryService.getPopularCoursesByCategory(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  if (isError) {
    console.error('PopularCourses API ERROR:', error);
  }
  

  // Extract categories (id and name) from the data
  const categories = React.useMemo(() => {
    if (!categorizedData || !Array.isArray(categorizedData)) return [];
    return categorizedData.map(item => ({
      id: item.category_id?.toString() || "",
      name: item.category_name || "General"
    }));
  }, [categorizedData]);

  // Derived active tab: Always prioritize the first category if none is selected
  const currentActiveTab = activeTab || (categories.length > 0 ? categories[0].id : "");

  // Update effect to synchronize the state but not block rendering
  React.useEffect(() => {
    if (categories.length > 0 && activeTab === "") {
      setActiveTab(categories[0].id);
    }
  }, [categories, activeTab]);

  const visibleItems = React.useMemo(() => {
    if (!categorizedData || !Array.isArray(categorizedData) || !currentActiveTab) return [];
    
    // Find category using the calculated currentActiveTab (avoids 'missing frame' delay)
    const currentCategory = categorizedData.find(
      item => item.category_id?.toString() === currentActiveTab
    );
    
    return currentCategory?.course_data || [];
  }, [categorizedData, currentActiveTab]);

  React.useEffect(() => {
    const tabsList = tabsListRef.current;
    if (!tabsList || isLoading) return;

    const updateIndicator = () => {
      const activeTrigger = tabsList.querySelector('[data-state="active"]');
      if (activeTrigger) {
        // Use getBoundingClientRect for more accuracy if offset is failing
        setIndicatorStyle({
          left: activeTrigger.offsetLeft,
          width: activeTrigger.offsetWidth,
        });
      }
    };

    // Use a small delay to ensure rendering is complete (fixes the width issue)
    const timeout = setTimeout(updateIndicator, 50);
    
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timeout);
    };
  }, [currentActiveTab, isLoading, categories]); // categories dependency ensures recalc when data arrives

  return (
    <section className={cn("w-full py-4 m-0", className)}>
      <Tabs 
        value={currentActiveTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <div className="flex flex-col gap-4 mb-7">
          <h2 className="text-[#1A1A1A]">
            {title} <span className="text-primary">{highlight}</span>
          </h2>

          <div className="relative border-b border-gray-200">
            <TabsList 
              ref={tabsListRef} 
              className="bg-transparent pb-[4px] gap-8 md:gap-12 h-auto border-none flex-nowrap justify-start leading-none overflow-x-auto no-scrollbar"
            >
              {isLoading ? (
                // Render 4 tab skeletons while loading
                [...Array(4)].map((_, i) => (
                  <div key={`tab-skeleton-${i}`} className="py-3.5 flex items-center">
                    <Skeleton className="h-6 w-32 rounded-md" />
                  </div>
                ))
              ) : (
                categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="rounded-none border-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-text-main px-0 py-3.5 text-base md:text-md lg:text-lg xl:text-lg 2xl:text-xl font-medium text-[#808080] transition-colors hover:text-text-main z-10 leading-none after:hidden shrink-0 cursor-pointer shadow-none"
                  >
                    {cat.name}
                  </TabsTrigger>
                ))
              )}
              {!isLoading && (
                <div 
                  className="absolute bottom-0 h-[2px] bg-text-main transition-all duration-300 ease-in-out z-20"
                  style={indicatorStyle}
                />
              )}
            </TabsList>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {isLoading ? (
            // Unified section loading state: Show carousel skeletons immediately
            <Carousel
              opts={{
                align: "start",
                loop: false,
                dragFree: true,
                containScroll: "trimSnaps",
              }}
              className="w-full relative group"
            >
              <CarouselContent className="-ml-4 md:-ml-6 items-stretch">
                {[...Array(4)].map((_, i) => (
                  <CarouselItem key={`skeleton-${i}`} className="pl-4 md:pl-6 basis-auto">
                    <CourseCardSkeleton />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            // Data resolved: Show actual tabbed content
            categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-0 focus-visible:outline-none">
                <Carousel
                  opts={{
                    align: "start",
                    loop: false,
                    dragFree: true,
                    containScroll: "trimSnaps",
                  }}
                  className="w-full relative group"
                >
                  <CarouselContent className="-ml-4 md:-ml-6 items-stretch">
                    {visibleItems.length > 0 ? (
                      visibleItems.map((item, i) => (
                        <CarouselItem key={i} className="pl-4 md:pl-6 basis-auto">
                          <CourseCard {...item} />
                        </CarouselItem>
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </CarouselContent>
                  
                  {visibleItems.length > 0 && (
                    <div className="hidden md:flex">
                      <CarouselPrevious 
                        className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow-xl border-none hover:bg-gray-50 text-black z-20 h-14 w-14 2xl:h-18 2xl:w-18 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" 
                      />
                      <CarouselNext 
                        className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow-xl border-none hover:bg-gray-50 text-black z-20 h-14 w-14 2xl:h-18 2xl:w-18 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" 
                      />
                    </div>
                  )}
                </Carousel>
              </TabsContent>
            ))
          )}
        </div>
      </Tabs>

      <div className="flex justify-end mt-10">
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-0 text-primary text-[16px] 2xl:text-[22px] font-bold hover:bg-transparent hover:gap-3 transition-all group cursor-pointer hover:text-brand-primary">
          Browse all course 
          <ChevronRight className="w-5 h-5 2xl:w-6 2xl:h-6 transition-transform" strokeWidth={3} />
        </Button>
      </div>
    </section>
  );
};

export default PopularCourses;
