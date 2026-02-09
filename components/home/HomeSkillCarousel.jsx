"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { POPULAR_SKILLS } from "@/app/(app)/constant";
import HomeSkillCard from "@/components/shared/HomeSkillCard";

const NavBtn = ({ icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="hover:opacity-50 transition-all active:scale-90 cursor-pointer"
  >
    <Icon className="w-8 h-8 stroke-[1.5px]" />
  </button>
);

export default function HomeSkillCarousel() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-text-main">
        Popular <span className="text-primary">Skills</span>
      </h2>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {POPULAR_SKILLS.map((item, i) => (
            <CarouselItem
              key={i}
              className="pl-6 basis-auto"
            >
              <HomeSkillCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>

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
      </Carousel>
    </section>
  );
}
