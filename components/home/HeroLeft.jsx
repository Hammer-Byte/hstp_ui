import React from "react";
import { Button } from "@/components/ui/button";
export default function HeroLeft() {
  return (
    <div className="flex flex-col gap-3 text-(--color-surface)">
      <h1 className="text-xl text-(--color-surface) md:text-4xl lg:text-[35px] font-semibold ">
        Build World-Class Hospitality <br className="hidden lg:block" />
        Skills.
      </h1>
      <p className="text-[16px] lg:text-[15px] font-medium leading-relaxed lg:w-full">
        Professional training for hotel staff, supervisors, and managers-learn{" "}
        <br className="hidden lg:block" />
        anytime, anywhere.
      </p>
      <div className="mt-6 lg:mt-9">
        <Button className="bg-background text-foreground rounded-full  text-md w-50 h-10 font-medium shadow-lg hover:bg-foreground hover:text-background transition-all duration-300">
          Browse Course
        </Button>
      </div>
    </div>
  );
}
