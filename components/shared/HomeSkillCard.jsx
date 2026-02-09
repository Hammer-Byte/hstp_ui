"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HomeSkillCard = ({ image, title, className }) => {
  return (
    <div className={cn(
      "group bg-white rounded-[2rem] border border-[#D9D9D9] p-6 flex flex-col items-center justify-between gap-4n lg:w-[250px] xl:w-[260px] 2xl:w-[280px] lg:h-[260px] xl:h-[280px] 2xl:h-[290px] shrink-0 transition-all hover:shadow-xl hover:shadow-primary/5",
      className
    )}>
      <div className="relative rounded-3 w-full lg:h-[140px] xl:h-[150px] 2xl:h-[160px] flex items-center justify-center overflow-hidden">
            <Image
              // src={image || "/sample-course.png"}
              src={"/sample-course.png"}
              alt={title}
              className="object-cover"
              fill
            />
      </div>

      <h3 className="text-center lg:text-[15px] xl:text-[16px] font-semibold text-[#1A1A1A] leading-tight m-0">
        {title}
      </h3>

      <Button className="w-[85%] h-8 lg:h-9 xl:h-10 bg-primary hover:bg-primary text-[15px] font-bold rounded-[12px] transition-all active:scale-[0.98] cursor-pointer">
        Learn more
      </Button>
    </div>
  );
};

export default HomeSkillCard;
