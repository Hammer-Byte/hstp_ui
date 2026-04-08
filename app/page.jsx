import Hero from "@/components/home/Hero";
import HomeSkillCarousel from "@/components/home/HomeSkillCarousel";
import PopularCourses from "@/components/home/PopularCourses";
import SystemCarousels from "@/components/home/SystemCarousels";
import Testimonials from "@/components/home/Testimonials";
import IndustryExperts from "@/components/home/IndustryExperts";
import SkillBasedCourses from "@/components/home/SkillBasedCourses";
import { COURSE_DATA } from "./(app)/constant";
import Carousels from "@/components/home/SkillCarousels";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import categoryService from "@/services/categoryService";

export default async function Home() {
  const queryClient = new QueryClient();

  // Prefetching all section-specific data on the server simultaneously
  // This makes the page load with categories and popular courses data already in the HTML (SSR)
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["course-categories"],
      queryFn: () => categoryService.getCategories(),
    }),
    queryClient.prefetchQuery({
      queryKey: ["popular-categorized-courses"],
      queryFn: () => categoryService.getPopularCoursesByCategory(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-white min-h-screen">
        <Hero />
        <div className="container mx-auto py-8 md:py-10 lg:py-12 xl:py-14 px-4 sm:px-6 lg:px-8 space-y-20">
          <Carousels />
          <PopularCourses 
            title="Popular"
            highlight="Courses"
            items={COURSE_DATA}
          />
          <IndustryExperts />
          <SkillBasedCourses />
          {/* <SystemCarousels /> */}
          {/* <HomeSkillCarousel /> */}
          <Testimonials />
        </div>
      </div>
    </HydrationBoundary>
  );
}
