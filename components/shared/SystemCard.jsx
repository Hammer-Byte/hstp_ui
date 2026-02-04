"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SystemCard = ({ image, title, className }) => {
  return (
    <div className={cn(
      "group bg-white rounded-[2rem] border border-[#D9D9D9] p-5 flex flex-col items-center justify-between w-[220px] h-[232px] shrink-0 transition-all hover:shadow-xl hover:shadow-primary/5",
      className
    )}>
      <div className="relative w-full h-36 flex items-center justify-center">
        <Image
          src={ "/system.png"}
          alt={title}
          width={100}
          height={80}
          className="object-contain"
        />
      </div>

      <Button className="w-28 h-10 bg-brand-primary hover:bg-brand-primary text-[14px] font-medium rounded-xl transition-all active:scale-[0.98] cursor-pointer">
        view
      </Button>
    </div>
  );
};

export default SystemCard;
