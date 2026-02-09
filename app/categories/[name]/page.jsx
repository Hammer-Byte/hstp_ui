'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { COURSE_DATA } from '@/app/(app)/constant';
import CourseCard from '@/components/shared/CourseCard';
import { ChevronLeft, ChevronRight, Star, Users, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import CategoryCourseCard from '../../../components/shared/CategoryCourseCard';

export default function CategoryPage() {
  const { name } = useParams();
  const categoryName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  console.log(categoryName);
  
  // Simulation of more data for pagination
  const allCourses = [...COURSE_DATA, ...COURSE_DATA, ...COURSE_DATA, ...COURSE_DATA].map(course => ({
    ...course,
    image: "/sample-course.png"
  }));
  
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

  return (
    <div className="bg-white min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h1 className="font-semibold text-[#1A1A1A] leading-tight">
                  {categoryName} Courses
                </h1>
                <p className="text-[12px] mg:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] text-black font-regular max-w-2xl">
                  Guest check-in/out, reservations, concierge, reception operations.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[12px] mg:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-bold text-[#1A1A1A]">Category Rating :</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#FFC107] text-[#FFB60C]" />
                  <span className="text-[12px] mg:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-bold text-[#1A1A1A]">4.7</span>
                </div>
              </div>

              <div className="flex items-center gap-12 pt-2">
                <div className="space-y-1">
                  <p className="text-[12px] mg:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-bold text-[#1A1A1A]">Total Learners</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#1A1A1A]" />
                    <span className="text-[20px] md:text-[22px] lg:text-[24px] xl:text-[24px] 2xl:text-[26px] font-medium text-[#1A1A1A]">32,5000</span>
                  </div>
                </div>
                
                <div className="h-10 w-[1.5px] bg-[#D9D9D9]" />

                <div className="space-y-1">
                  <p className="text-[12px] mg:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-bold text-[#1A1A1A]">Number of Courses</p>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#1A1A1A]" />
                    <span className="text-[20px] md:text-[22px] lg:text-[24px] xl:text-[24px] 2xl:text-[26px] font-medium text-[#1A1A1A]">2,345</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Placeholder logic can go here later */}
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
