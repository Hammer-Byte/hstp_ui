"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import categoryService from "@/services/categoryService";
import SkillCarouselCard, { SkillCarouselCardSkeleton } from "./SkillCarouselCard";
import { getImageUrl } from "@/lib/utils";

const NavBtn = ({ icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="hover:opacity-50 transition-all active:scale-95 cursor-pointer"
  >
    <Icon className="w-10 h-10 stroke-[1.2px]" />
  </button>
);

export default function Carousels() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  // Fetch categories using TanStack Query
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["course-categories"],
    queryFn: () => categoryService.getCategories(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false, 
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Map API data to the format expected by the card
  const skillsData = categories?.length > 0 
    ? categories.map(cat => ({
        title: cat.description || ("Everything about " + cat.title),
        tag: cat.title,
        image: getImageUrl(cat.image),
        id: cat.id,
      }))
    : [];


  return (
    <section className="m-0">
      <h2 className="font-semibold text-center mt-12 mb-8">
        Learn Skills{" "}
        <span className="text-primary">That Matter</span>
      </h2>

      <div className="w-full max-w-[1440px] mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {[...Array(4)].map((_, i) => <SkillCarouselCardSkeleton key={i} />)}
          </div>
        ) : error && skillsData.length === 0 ? (
            <div className="text-center py-20 text-red-500 bg-red-50 rounded-3xl border border-red-200">
                <p className="font-medium">Failed to load categories.</p>
                <p className="text-sm opacity-70">Please ensure the backend server is running.</p>
            </div>
        ) : skillsData.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-3xl">
                No categories found.
            </div>
        ) : (
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: skillsData.length > 4 }}
          >
            <CarouselContent className="-ml-4">
              {skillsData.map((item, i) => (
                <CarouselItem
                  key={`skill-${i}`}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <SkillCarouselCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex items-center justify-end gap-6 mt-10 pr-4">
              <NavBtn icon={ChevronLeft} onClick={() => api?.scrollPrev()} />
              <div className="flex gap-2.5">
                {api?.scrollSnapList().map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    onClick={() => api?.scrollTo(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                      current === i ? "bg-black" : "border border-gray-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <NavBtn icon={ChevronRight} onClick={() => api?.scrollNext()} />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}
