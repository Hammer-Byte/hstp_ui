import HeroLeft from "./HeroLeft";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="relative w-full h-[400px]  2xl:h-[700px]  lg:h-[600px]  bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center px-6 lg:px-12 pb-12 overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl">
        <div className="w-full md:max-w-[80%] lg:max-w-[70%]">
          <HeroLeft />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 h-full w-[50%] lg:w-[60%] -mr-22 lg:-mr-23 pointer-events-none select-none">
        <Image
          src="/hero-sec-image.png"
          alt="Hero Section Illustration"
          fill
          sizes="60vw"
          className="object-contain object-right-bottom scale-90 md:scale-125 lg:scale-112  pr-15 origin-bottom-right"
          priority
        />
      </div>
    </div>
  );
}
