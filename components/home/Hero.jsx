import HeroLeft from "./HeroLeft";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="w-full bg-linear-to-b from-(--color-brand-primary) to-dark-brand">
    <div className="relative container mx-auto min-h-[350px] h-auto md:h-100 lg:h-105 xl:h-130 2xl:h-140 flex flex-col md:flex-row items-center justify-center md:justify-start py-12 md:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="z-10 w-full md:max-w-[80%] lg:max-w-[60%] xl:max-w-[75%]">
        <div className="w-full">
          <HeroLeft />
        </div>
      </div>
      <div className="hidden md:block absolute right-0 bottom-0 h-full w-[50%] lg:w-[55%] xl:w-[60%] -mr-22 lg:-mr-25 pointer-events-none select-none">
        <Image
          src="/hero-sec-image.png"
          alt="Hero Section Illustration."
          fill
          sizes="60vw"
          className="object-contain object-bottom-right scale-90 md:scale-125 lg:scale-112  pr-15 origin-bottom-right"
          priority
        />
      </div>
    </div>
    </div>
  );
}
