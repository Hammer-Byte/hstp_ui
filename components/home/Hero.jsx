import HeroLeft from "./HeroLeft";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center px-6 lg:px-16 pb-30 overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl">
        <div className="w-full lg:max-w-[70%]">
          <HeroLeft />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 h-full w-[60%] -mr-22 pointer-events-none select-none">
        <Image
          src="/hero-sec-image.png"
          alt="Hero Section Illustration"
          fill
          sizes="60vw"
          className="object-contain object-right-bottom scale-105 lg:scale-112 origin-bottom-right"
          priority
        />
      </div>
    </div>
  );
}
