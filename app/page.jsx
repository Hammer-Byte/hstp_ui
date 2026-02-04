import Hero from "@/components/home/Hero";
import HomeSkillCarousel from "@/components/home/HomeSkillCarousel";
import PopularCourses from "@/components/home/PopularCourses";
import SystemCarousels from "@/components/home/SystemCarousels";
import Testimonials from "@/components/home/Testimonials";
import IndustryExperts from "@/components/home/IndustryExperts";
import { courseData } from "./(app)/constant";
import Carousels from "@/components/home/SkillCarousels";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <div className="container mx-auto py-8 md:py-10 lg:py-12 xl:py-14 px-4 sm:px-6 lg:px-8 space-y-20">
        <Carousels />
        <PopularCourses 
          title="Popular"
          highlight="Courses"
          items={courseData}
        />
        <SystemCarousels />
        <HomeSkillCarousel />
        {/* <IndustryExperts /> */}
        <Testimonials />
      </div>
    </div>
  );
}
