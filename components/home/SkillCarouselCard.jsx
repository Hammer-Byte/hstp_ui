import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function CarouselCard({ item }) {
  return (
    <div className="group  m-2 rounded-[2.5rem] border-2 border-black bg-white transition-all duration-300 shadow-[0px_6px_3px_#a9a9a9]">
      <div className="relative aspect-square overflow-hidden rounded-t-[2.4rem]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 50vw, 336px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent flex items-end p-6">
          <p className="text-white text-[18px] md:text-[20px] lg:text-[21px] xl:text-[22px] 2xl:text-[24px] font-medium  w-full">
            {item.title}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <span className="bg-foreground flex items-center justify-center text-white rounded-full lg:w-45 xl:w-47 2xl:w-50 h-9 lg:h-10 xl:h-11 2xl:h-12 text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] whitespace-nowrap overflow-hidden">
          {item.tag}
        </span>
        <button className="2xl:w-12 2xl:h-12 xl:h-11 xl:w-11 lg:h-10 lg:w-10 w-10 h-10 shrink-0 flex items-center justify-center border-3 border-black rounded-full hover:bg-black hover:text-white transition-colors">
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
