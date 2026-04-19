import React from "react";
import { Button } from "@/components/ui/button";
export default function HeroLeft() {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 lg:gap-2 xl:gap-3 text-text-white w-full">
      <h1 className="text-white text-3xl md:text-4xl lg:text-[32px] xl:text-[35px] font-semibold ">
        Build World-Class Hospitality <br className="hidden lg:block" />
        Skills.
      </h1>
      <p className="text-[16px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-medium leading-relaxed lg:w-full opacity-90 px-2 md:px-0">
        Professional training for hotel staff, supervisors, and managers-learn{" "}
        <br className="hidden md:block" />
        anytime, anywhere.
      </p>
      <div className="mt-4 md:mt-6 lg:mt-9 w-full md:w-auto">
        <Button className="bg-background text-foreground rounded-full text-md w-full md:w-50 h-12 md:h-10 font-medium shadow-lg hover:bg-foreground hover:text-background transition-all duration-300">
          Browse Course
        </Button>
      </div>
    </div>
  );
}
