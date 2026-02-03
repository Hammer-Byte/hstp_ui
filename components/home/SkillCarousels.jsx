"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SKILLS_DATA } from "@/app/utils/skillCarouselList";
import SkillCarouselCard from "./SkillCarouselCard";
export default function Carousels() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const NavBtn = ({ dir, icon: Icon }) => (
    <button
      onClick={() => (dir === "next" ? api?.scrollNext() : api?.scrollPrev())}
      className="hover:opacity-50 transition-all active:scale-90"
    >
      <Icon className="w-10 h-10 stroke-[1.2px]" />
    </button>
  );

  return (
    <section className="w-full py-10 ">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Learn Skills{" "}
        <span className="text-[var(--color-brand-primary)]">That Matter</span>
      </h2>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full max-w-[1440px] mx-auto"
      >
        <CarouselContent className="-ml-4 ">
          {SKILLS_DATA.map((item, i) => (
            <CarouselItem
              key={i}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <SkillCarouselCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center justify-end gap-6 mt-10 pr-4">
          <NavBtn dir="prev" icon={ChevronLeft} />
          <div className="flex gap-2.5">
            {api?.scrollSnapList().map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${current === i ? "bg-black" : "border border-gray-400"}`}
              />
            ))}
          </div>
          <NavBtn dir="next" icon={ChevronRight} />
        </div>
      </Carousel>
    </section>
  );
}
