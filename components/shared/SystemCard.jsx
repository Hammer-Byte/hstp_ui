"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SystemCard = ({ image, title, className }) => {
  return (
    <div className={cn(
      "group bg-white rounded-[2rem] border border-[#D9D9D9] p-5 flex flex-col items-center justify-between md:w-[210px] lg:w-[220px] xl:w-[230px] 2xl:w-[240px] md:h-[230px] lg:h-[240px] xl:h-[250px] 2xl:h-[260px]  shrink-0 transition-all hover:shadow-xl hover:shadow-primary/5",
      className
    )}>
      <div className="relative w-full lg:h-36 xl:h-38 flex items-center justify-center">
        <Image
          src={ "/system.png"}
          alt={title}
          width={100}
          height={80}
          className="object-contain"
        />
      </div>

      <Button className="w-[85%] lg:h-10 xl:h-11 bg-brand-primary hover:bg-brand-primary lg:text-[15px] xl:text-[16px] font-semibold rounded-[12px] transition-all active:scale-[0.98] cursor-pointer">
        view
      </Button>
    </div>
  );
};

export default SystemCard;
