import React from "react";
import { Button } from "@/components/ui/button";
export default function HeroLeft() {
  return (
    <div className="flex flex-col gap-3 text-[var(--color-surface)]">
      <h1 className="text-3xl md:text-4xl lg:text-[40px] font-semibold ">
        Build World-Class Hospitality <br className="hidden md:block" />
        Skills.
      </h1>
      <p className="text-[16px] lg:text-[18px] font-medium leading-relaxed lg:w-full">
        Professional training for hotel staff, supervisors, and managers-learn  <br className="hidden md:block" />
        anytime, anywhere.
      </p>
      <div className="mt-[24px] lg:mt-[36px]">
        <Button className="bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full px-8 lg:px-10 py-5 lg:py-7 text-lg font-bold shadow-lg hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-all duration-300">
          Browse Course
        </Button>
      </div>
    </div>
  );
}
