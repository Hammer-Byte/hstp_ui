"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HomeSkillCard = ({ image, title, className }) => {
  return (
    <div className={cn(
      "group bg-white rounded-[2rem] border border-[#D9D9D9] p-6 flex flex-col items-center justify-betwee gap-4n w-[250px] h-[260px] shrink-0 transition-all hover:shadow-xl hover:shadow-primary/5",
      className
    )}>
      <div className="relative rounded-3 w-full h-[138px] flex items-center justify-center overflow-hidden">
            <Image
              // src={image || "/sample-course.png"}
              src={"/sample-course.png"}
              alt={title}
              className="object-cover"
              fill
            />
      </div>

      <h3 className="text-center text-[13px] font-bold text-[#1A1A1A] leading-tight px-2 mt-2">
        {title}
      </h3>

      <Button className="w-28 h-8 md:h-9 bg-primary hover:bg-primary text-[12px] font-bold rounded-lg transition-all active:scale-[0.98] cursor-pointer">
        Learn more
      </Button>
    </div>
  );
};

export default HomeSkillCard;
