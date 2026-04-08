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
import homeService from "@/services/homeService";
import courseService from "@/services/courseService";

export default async function Home() {
  const queryClient = new QueryClient();

  console.log("SSR: Starting prefetch for Home page sections...");
  
  // Prefetching all section-specific data on the server simultaneously
  // This makes the page load with categories and popular courses data already in the HTML (SSR)
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["course-categories"],
      queryFn: async () => {
        try {
          console.log("SSR Fetching: Categories...");
          const data = await categoryService.getCategories();
          console.log(`SSR Success: Categories (${data?.length || 0} items)`);
          return data;
        } catch (err) {
          console.error("SSR Error (Categories):", err.message || err);
          return [];
        }
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["popular-categorized-courses"],
      queryFn: async () => {
        try {
          console.log("SSR Fetching: Popular Courses...");
          const data = await categoryService.getPopularCoursesByCategory();
          console.log(`SSR Success: Popular Courses (${data?.length || 0} categories)`);
          return data;
        } catch (err) {
          console.error("SSR Error (Popular Courses):", err.message || err);
          return [];
        }
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["testimonials"],
      queryFn: async () => {
        try {
          console.log("SSR Fetching: Testimonials...");
          const data = await homeService.getTestimonials();
          console.log(`SSR Success: Testimonials (${data?.length || 0} items)`);
          return data;
        } catch (err) {
          console.error("SSR Error (Testimonials):", err.message || err);
          return [];
        }
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["all-courses"],
      queryFn: async () => {
        try {
          console.log("SSR Fetching: All Courses (Skill-Based)...");
          const data = await courseService.getCourses();
          console.log(`SSR Success: All Courses (${data?.length || 0} items)`);
          return data;
        } catch (err) {
          console.error("SSR Error (All Courses):", err.message || err);
          return [];
        }
      },
    }),
  ]);

  const initialCategories = queryClient.getQueryData(["course-categories"]) || [];
  const initialPopularCourses = queryClient.getQueryData(["popular-categorized-courses"]) || [];
  const initialTestimonials = queryClient.getQueryData(["testimonials"]) || [];
  const initialAllCourses = queryClient.getQueryData(["all-courses"]) || [];

  console.log("SSR: Prefetch complete.");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-white min-h-screen">
        <Hero />
        <div className="container mx-auto py-8 md:py-10 lg:py-12 xl:py-14 px-4 sm:px-6 lg:px-8 space-y-20">
          <Carousels initialData={initialCategories} />
          <PopularCourses 
            title="Popular"
            highlight="Courses"
            items={COURSE_DATA}
            initialData={initialPopularCourses}
          />
          <IndustryExperts />
          <SkillBasedCourses initialData={initialAllCourses} />
          {/* <SystemCarousels /> */}
          {/* <HomeSkillCarousel /> */}
          <Testimonials initialData={initialTestimonials} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
