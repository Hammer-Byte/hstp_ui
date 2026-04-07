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

const PopularCourses = ({ title, highlight, items = [], className }) => {
  const categories = [
    "Food & Beverage",
    "Hotel Operations",
    "SOPs & Standards",
    "Safety & Compliance"
  ];

  const [activeTab, setActiveTab] = React.useState(categories[0]);
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 });
  const tabsListRef = React.useRef(null);

  React.useEffect(() => {
    const tabsList = tabsListRef.current;
    if (!tabsList) return;

    const updateIndicator = () => {
      const activeTrigger = tabsList.querySelector('[data-state="active"]');
      if (activeTrigger) {
        setIndicatorStyle({
          left: activeTrigger.offsetLeft,
          width: activeTrigger.offsetWidth,
        });
      }
    };

    updateIndicator();
    // Also update on window resize to keep indicator aligned
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  return (
    <section className={cn("w-full py-4 m-0", className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col gap-4 mb-7">
          <h2 className="text-[#1A1A1A]">
            {title} <span className="text-primary">{highlight}</span>
          </h2>

          <div className="relative border-b border-gray-200">
            <TabsList 
              ref={tabsListRef} 
              className="bg-transparent pb-[4px] gap-8 md:gap-12 h-auto border-none flex-nowrap justify-start leading-none overflow-x-auto no-scrollbar"
            >
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="rounded-none border-none bg-transparent data-[state=active]:shadow-none data-[state=active]:text-text-main px-0 py-3.5 text-base md:text-md lg:text-lg xl:text-lg 2xl:text-xl font-medium text-[#808080] transition-colors hover:text-text-main z-10 leading-none after:hidden shrink-0 cursor-pointer shadow-none"
                >
                  {cat}
                </TabsTrigger>
              ))}
              <div 
                className="absolute bottom-0 h-[2px] bg-text-main transition-all duration-300 ease-in-out z-20"
                style={indicatorStyle}
              />
            </TabsList>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {categories.map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-0 focus-visible:outline-none">
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
                  {items.map((item, i) => (
                    <CarouselItem key={i} className="pl-4 md:pl-6 basis-auto">
                      <CourseCard {...item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="hidden md:flex">
                  <CarouselPrevious 
                    className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow-xl border-none hover:bg-gray-50 text-black z-20 h-14 w-14 2xl:h-18 2xl:w-18 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" 
                  />
                  <CarouselNext 
                    className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow-xl border-none hover:bg-gray-50 text-black z-20 h-14 w-14 2xl:h-18 2xl:w-18 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" 
                  />
                </div>
              </Carousel>
            </TabsContent>
          ))}
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
