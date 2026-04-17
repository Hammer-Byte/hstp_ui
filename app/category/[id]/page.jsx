'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CategoryCourseCard from '@/components/shared/CategoryCourseCard';
import CategoryCourseCardSkeleton from '@/components/shared/CategoryCourseCardSkeleton';
import { Skeleton } from '@/components/shared/Skeleton';
import { COURSE_DATA } from '@/app/(app)/constant';
import { ChevronLeft, ChevronRight, Star, Users, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useQuery } from '@tanstack/react-query';
import categoryService from '@/services/categoryService';

export default function CategoryPage() {
  const { id } = useParams();
  
  // Fetch courses for this category using the new service
  const { data: categoryData, isLoading, error } = useQuery({
    queryKey: ['category-courses', id],
    queryFn: () => categoryService.getCategoryCourses(id),
    staleTime: 5 * 60 * 1000,
  });

  // Simulation of more data for pagination
  // This will be replaced with real data from categoryData once schema is confirmed
  // Process courses from the new schema
  const allCourses = React.useMemo(() => {
    if (!categoryData) return [];
    
    // Real schema: categoryData.course_data
    // Fallback: categoryData.courses or categoryData itself if it's an array
    const courses = categoryData.course_data || 
                    (Array.isArray(categoryData) ? categoryData : (categoryData.course_data || []));

    return courses.map(course => ({
      ...course,
      image: course.image || "/sample-course.png"
    }));
  }, [categoryData]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = allCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  
  const totalPages = Math.ceil(allCourses.length / coursesPerPage);

  const paginate = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">Failed to load courses</h2>
        <p className="text-gray-500 mt-2">Please try again later or check your connection.</p>
      </div>
    );
  }

  const categoryName = categoryData?.category_name || categoryData?.name || id;
  const categoryDescription = categoryData?.category_description || categoryData?.description || "Explore our comprehensive list of courses in this category.";
  const totalCourses = categoryData?.number_of_courses || allCourses.length;
  const totalLearners = categoryData?.number_of_learners || categoryData?.total_learners || "0"; // Placeholder updated with possible keys

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen pb-20 pt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-12 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                   <Skeleton className="h-4 w-32" />
                   <Skeleton className="h-4 w-12" />
                </div>

                <div className="flex items-center gap-12 pt-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                  <div className="h-10 w-[1.5px] bg-gray-100" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12 2xl:gap-x-10 xl:gap-y-16">
            {[...Array(8)].map((_, index) => (
              <CategoryCourseCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 pt-6 md:pt-10 font-dm-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Category Header Section */}
        <div className="mb-8 md:mb-12 text-center md:text-left border-b border-gray-50 pb-8">
          <div className="flex flex-col gap-4">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 bg-primary/5 rounded-full mb-1">
                <span className="text-[12px] font-bold text-primary uppercase tracking-widest">Category</span>
              </div>
              <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
                {categoryName} <span className="text-primary tracking-normal">Courses</span>
              </h1>
              <p className="text-[15px] md:text-[17px] text-[#5F5F5F] font-medium max-w-2xl mx-auto md:mx-0 leading-snug">
                {categoryDescription}
              </p>
            </div>

            <div className="flex flex-row justify-center md:justify-start items-center gap-8 md:gap-12 pt-4">
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] md:text-[12px] font-bold text-[#808080] uppercase tracking-widest">Learners</p>
                </div>
                <span className="text-[24px] md:text-[28px] font-black text-[#1A1A1A]">{totalLearners}</span>
              </div>
              
              <div className="h-8 w-px bg-gray-200" />

              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-600">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] md:text-[12px] font-bold text-[#808080] uppercase tracking-widest">Courses</p>
                </div>
                <span className="text-[24px] md:text-[28px] font-black text-[#1A1A1A]">{totalCourses}</span>
              </div>

              {categoryData?.category_rating && (
                <>
                  <div className="hidden sm:block h-8 w-px bg-gray-200" />
                  <div className="hidden sm:flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div className="w-6 h-6 rounded-full bg-orange-400/10 flex items-center justify-center text-orange-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <p className="text-[11px] md:text-[12px] font-bold text-[#808080] uppercase tracking-widest">Rating</p>
                    </div>
                    <span className="text-[24px] md:text-[28px] font-black text-[#1A1A1A]">{categoryData.category_rating}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12 2xl:gap-x-10 xl:gap-y-16">
          {currentCourses.map((course, index) => (
            <CategoryCourseCard 
              key={index}
              {...course}
              showWishlist={false}
            />
          ))}
        </div>

        {/* Pagination Section */}
        <div className="mt-24 flex justify-end items-center gap-1">
          <button 
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 group"
          >
            <ChevronLeft className="w-6 h-6 text-primary font-bold" strokeWidth={3} />
          </button>
          
          <div className="flex items-center gap-0.5">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              
              if (pageNum <= 3 || pageNum === totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-[18px] font-bold transition-all",
                      currentPage === pageNum 
                        ? "text-primary bg-transparent" 
                        : "text-[#808080] hover:text-primary"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              }
              
              if (pageNum === 4) {
                return <span key="dots" className="text-[#808080] font-bold text-[18px] px-1">.....</span>;
              }
              
              return null;
            })}
          </div>

          <button 
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 group"
          >
            <ChevronRight className="w-6 h-6 text-primary font-bold" strokeWidth={3} />
          </button>
        </div>
      </div>
      
      {/* Responsive adjustments for ultra-wide screens */}
      <style jsx global>{`
        @media (min-width: 2000px) {
          .container {
            max-width: 1800px !important;
          }
        }
        @media (min-width: 2500px) {
          .container {
            max-width: 2200px !important;
          }
        }
      `}</style>
    </div>
  );
}
