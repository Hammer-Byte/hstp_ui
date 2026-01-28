import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function CarouselCard({ item }) {
  return (
    <div className="group h-[420px] rounded-[2.5rem] border border-black overflow-hidden bg-white p-2 transition-shadow hover:shadow-md">
      <div className="relative h-[300px] rounded-[2rem] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 50vw, 336px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-6">
          <p className="text-white text-xl font-medium">{item.title}</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <span className="bg-[var(--color-foreground)] text-white rounded-full px-8 py-3 text-sm">
          {item.tag}
        </span>
        <button className="w-12 h-12 flex items-center justify-center border border-gray-900 rounded-full hover:bg-black hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
