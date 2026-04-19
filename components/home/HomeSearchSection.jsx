"use client";

import React from "react";
import { Search } from "lucide-react";

export default function HomeSearchSection({ userName = "Shivam" }) {
  return (
    <div className="block md:hidden w-full bg-white pt-6 pb-2 px-4 sm:px-6 lg:px-8 mt-4 md:mt-6 mb-2">
      <div className="container mx-auto flex flex-col gap-4">
        <h1 className="text-[22px] md:text-[28px] lg:text-[32px] font-bold text-[#1A1A1A] m-0">
          Hii {userName} <span className="text-primary">Welcome</span>
        </h1>
        
        <div className="relative w-full max-w-[700px] mt-1 mb-2">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-primary stroke-[2.5px]" />
          </div>
          <input
            type="text"
            placeholder="Search training, protocols, skills"
            className="w-full pl-14 pr-4 py-3.5 md:py-4 lg:py-5 rounded-full border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm text-[15px] md:text-[16px] text-[#1A1A1A] placeholder:text-gray-300 transition-all font-medium"
          />
        </div>
      </div>
    </div>
  );
}
