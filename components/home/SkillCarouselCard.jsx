/* eslint-disable @next/next/no-img-element */
import { ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

export default function CarouselCard({ item }) {
  return (
    <div className="group  m-2 rounded-[2.5rem] border-2 border-black bg-white transition-all duration-300 shadow-[0px_6px_3px_#a9a9a9]">
      <div className="relative aspect-[4/3] xl:aspect-[5/4] overflow-hidden rounded-t-[2.4rem]">
        <img
          src={getImageUrl(item.image)}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent flex items-end p-6">
          <p className="text-white text-[18px] md:text-[20px] lg:text-[21px] xl:text-[22px] 2xl:text-[24px] font-medium  w-full">
            {item.title}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <span className="bg-foreground flex items-center justify-center text-white rounded-full lg:w-45 xl:w-47 2xl:w-50 h-9 lg:h-10 xl:h-11 2xl:h-12 text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] px-4 overflow-hidden">
          <span className="truncate">{item.tag}</span>
        </span>
           <Link
             key={item.id}
             href={`/category/${item.id}`}
             className="2xl:w-12 2xl:h-12 xl:h-11 xl:w-11 lg:h-10 lg:w-10 w-10 h-10 shrink-0 flex items-center justify-center border-3 border-black rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer"
           >
             <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
           </Link>
      </div>
    </div>
  );
}

export function SkillCarouselCardSkeleton() {
  return (
    <div className="m-2 rounded-[2.5rem] border-2 border-slate-200 bg-white animate-pulse">
      <div className="relative aspect-[4/3] xl:aspect-[5/4] overflow-hidden rounded-t-[2.4rem] bg-slate-200" />
      <div className="flex items-center justify-between p-4">
        <div className="h-9 lg:h-10 w-24 bg-slate-200 rounded-full" />
        <div className="w-10 h-10 border-3 border-slate-200 rounded-full" />
      </div>
    </div>
  );
}
