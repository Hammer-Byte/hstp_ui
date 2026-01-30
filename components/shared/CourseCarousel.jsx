"use client";

import React from "react";
import CourseCard from "./CourseCard";
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

const CourseCarousel = ({ title, highlight, items = [], className }) => {
  return (
    <div className={cn("space-y-6 w-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-0">
        <h2>
          <span className="text-primary">{highlight}</span> {title}
        </h2>
      </div>

      {/* Carousel Container */}
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full relative px-12"
      >
        <CarouselContent className="-ml-6 items-stretch">
          {items.map((item, i) => (
            <CarouselItem key={i} className="pl-6 basis-auto">
              <CourseCard {...item} className="h-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Buttons - Always Visible */}
        <div className="flex">
          <CarouselPrevious 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-xl border-gray-100 hover:bg-gray-50 text-text-main z-20 opacity-100 flex items-center justify-center disabled:opacity-30 h-10 w-10" 
          />
          <CarouselNext 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-xl border-gray-100 hover:bg-gray-50 text-text-main z-20 opacity-100 flex items-center justify-center disabled:opacity-30 h-10 w-10" 
          />
        </div>
      </Carousel>

      {/* Footer Link */}
      <div className="flex justify-end px-1">
        <Button variant="ghost" className="flex items-center gap-1.5 h-auto p-0 text-primary text-[14px] font-bold hover:bg-transparent hover:gap-2 transition-all group">
          Browse all course 
          <ChevronRight className="w-4 h-4 transition-transform" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default CourseCarousel;
