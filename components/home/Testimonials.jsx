"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TESTIMONIALS_DATA } from "@/app/(app)/constant";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { useQuery } from "@tanstack/react-query";
import homeService from "@/services/homeService";
import { Skeleton } from "@/components/shared/Skeleton";

const TestimonialCardSkeleton = () => (
  <div className="bg-white rounded-[2rem] border border-[#E9E9E9] p-8 flex flex-col gap-6 w-[350px] sm:w-[380px] shrink-0">
    <div className="flex items-center gap-4">
      <Skeleton className="lg:w-16 lg:h-16 xl:w-17 xl:h-17 2xl:w-18 2xl:h-18 rounded-full" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>
    </div>
    
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-4 h-4 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-4 w-8 rounded-md" />
    </div>

    <div className="space-y-2">
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
    </div>
  </div>
);

const NavBtn = ({ icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="hover:opacity-50 transition-all active:scale-90 cursor-pointer"
  >
    <Icon className="w-8 h-8 stroke-[1.5px]" />
  </button>
);

export default function Testimonials({ initialData }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const { data: testimonialsData, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => homeService.getTestimonials(),
    staleTime: 5 * 60 * 1000,
    initialData,
  });

  const displayData = testimonialsData && Array.isArray(testimonialsData) && testimonialsData.length > 0 
    ? testimonialsData 
    : TESTIMONIALS_DATA;

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-text-main">
        Testimonials & <span className="text-primary">Success Stories</span>
      </h2>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {isLoading && !testimonialsData ? (
            [...Array(3)].map((_, i) => (
              <CarouselItem key={`skeleton-${i}`} className="pl-6 basis-auto">
                <TestimonialCardSkeleton />
              </CarouselItem>
            ))
          ) : (
            displayData.map((item, i) => (
              <CarouselItem
                key={i}
                className="pl-6 basis-auto"
              >
                <TestimonialCard {...item} />
              </CarouselItem>
            ))
          )}
        </CarouselContent>

        {!isLoading && (
          <div className="flex items-center justify-end gap-6 mt-10 pr-4">
            <NavBtn icon={ChevronLeft} onClick={() => api?.scrollPrev()} />
            <div className="flex gap-2.5">
              {api?.scrollSnapList().map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${current === i ? "bg-black" : "border border-gray-400"}`}
                />
              ))}
            </div>
            <NavBtn icon={ChevronRight} onClick={() => api?.scrollNext()} />
          </div>
        )}
      </Carousel>
    </section>
  );
}
