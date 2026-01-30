"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Star, 
  Check, 
  Play, 
  Clock, 
  Globe, 
  MessageCircle, 
  Monitor, 
  Award, 
  ChevronDown, 
  ChevronUp,
  Eye,
  FileText,
  HelpCircle,
  PlayCircle,
  Layout,
  Users,
  GraduationCap
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CourseCarousel from "@/components/shared/CourseCarousel";
import ReviewCard from "@/components/shared/ReviewCard";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { 
  Carousel as ShadcnCarousel, 
  CarouselContent as ShadcnCarouselContent, 
  CarouselItem as ShadcnCarouselItem,
  CarouselNext as ShadcnCarouselNext,
  CarouselPrevious as ShadcnCarouselPrevious 
} from "@/components/ui/carousel";

import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Custom lessons layout for curriculum
const LessonItem = ({ title, isPreview }) => (
  <div className="flex items-center justify-between group cursor-pointer transition-colors py-2">
    <span className="text-sm md:text-base font-medium text-text-shaded group-hover:text-text-main transition-colors">
      {title}
    </span>
    {isPreview && (
      <Button variant="ghost" className="flex items-center gap-1.5 h-auto p-0 text-[13px] font-bold text-text-main hover:bg-transparent hover:opacity-70 transition-opacity">
        <Eye className="w-4.5 h-4.5 stroke-[2.5px]" />
        Preview
      </Button>
    )}
  </div>
);

const DynamicStarRating = ({ rating, count }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 w-fit mb-[8px]">
      <div className="flex gap-0.5 md:gap-1">
        {[...Array(5)].map((_, i) => {
          const fillLevel = Math.max(0, Math.min(1, rating - i));
          return (
            <div key={i} className="relative">
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-200 fill-gray-200" />
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ width: `${fillLevel * 100}%` }}
              >
                <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-[13px] md:text-sm font-bold text-text-main">
        {rating} <span className="text-text-shaded font-medium leading-none">({count})</span>
      </span>
    </div>
  );
};

export default function CourseDetailPage() {
  const [openModule, setOpenModule] = useState(0);

  const modules = [
    {
      title: "Module 1 : Introduction to Data Science",
      duration: "30 min",
      lessons: [
        { title: "What is Data Science?", isPreview: true },
        { title: "Use cases & career paths", isPreview: true },
        { title: "Tools & ecosystem", isPreview: true },
      ]
    },
    {
      title: "Module 2 : Python for Data Science",
      duration: "1h 20m",
      lessons: [
        { title: "Introduction to Python", isPreview: false },
        { title: "NumPy & Pandas", isPreview: false },
      ]
    },
    {
      title: "Module 3 : Data Analysis with Pandas & NumPy",
      duration: "1h 30m",
      lessons: [
        { title: "Data Cleaning", isPreview: false },
        { title: "Data Manipulation", isPreview: false },
      ]
    },
    {
      title: "Module 4 : Introduction to Machine Learning",
      duration: "1h 20m",
      lessons: [
        { title: "Supervised Learning", isPreview: false },
        { title: "Unsupervised Learning", isPreview: false },
      ]
    },
    {
      title: "Module 5 : Mini Project & Assessment",
      duration: "50 min",
      lessons: [
        { title: "Final Project Overview", isPreview: false },
        { title: "Q&A Session", isPreview: false },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-4 md:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-6 md:mb-8">
          <BreadcrumbList className="text-[12px] md:text-sm text-text-shaded">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Development</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories">Data Science</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-text-main font-medium truncate max-w-[200px] sm:max-w-none">
                Full Roadmap Of Data Science 2026
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-start">
            <div className="relative w-full lg:w-[53%] xl:flex-1 aspect-16/10 sm:aspect-video lg:aspect-[16/9.5] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-xl md:shadow-2xl group cursor-pointer border border-gray-100">
              <Image 
                src="/sample-detail.png"
                alt="Course Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center p-1 border border-white/30 group-hover:scale-110 transition-transform">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                     <Play className="w-8 h-8 text-primary fill-current ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-semibold tracking-wide">Promo Video</span>
              </div>
            </div>

            <div className="flex-1 py-2">
              <div className="">
                <h1>Full Roadmap Of Data Science</h1>
                <p className="text-sm md:text-base lg:text-base xl:text-lg text-text-shaded font-medium">By Hammerbyte</p>
              </div>

              <div className="flex flex-col items-start gap-2 md:gap-3 lg:my-3 xl:my-4">
                <div className="flex gap-1.5 md:gap-2">
                  <Badge className="px-3 md:px-5 py-1.5 md:py-2 bg-primary/10 text-primary md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] md:text-xs font-bold rounded-[6px] md:rounded-[8px] border border-primary/20 tracking-wider hover:bg-primary/15 transition-colors">BEST SELLER</Badge>
                  <Badge className="px-3 md:px-5 py-1.5 md:py-2 bg-yellow-400/10 text-yellow-600 md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] md:text-xs font-bold rounded-[6px] md:rounded-[8px] border border-yellow-400/20 tracking-wider hover:bg-yellow-400/15 transition-colors">POPULAR</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-1 lg:mt-0 ">
                  <div className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-sm text-text-main font-semibold">
                    <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-main/40" />
                    <span>English, Hindi</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-sm text-text-main font-semibold">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-main/40" />
                    <span>4:00 Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-sm text-text-main font-semibold">
                    <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-main/40" />
                    <span>English</span>
                  </div>
                </div>
              </div>

              <DynamicStarRating rating={4.8} count={6009} />

              <div className="space-y-1.5 md:space-y-2 py-1 md:py-2">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-4xl text-text-main font-semibold line-through decoration-red-500/50 decoration-2">₹ 4999</span>
                  <span className="text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-4xl font-semibold text-text-main">₹ 2999</span>
                </div>
                <div className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-semibold">
                    80% Off
                  </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg lg:max-w-md xl:max-w-lg pt-2">
                <Button className="flex-1 h-10 md:h-11 lg:h-12 xl:h-14 2xl:h-15 text-[14px] md:text-[16px] lg:text-[16px] xl:text-[17px] 2xl:text-[20px] rounded-[12px] sm:rounded-[15px] lg:rounded-[20px] bg-primary hover:bg-primary/90 font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
                  Buy Now
                </Button>
                <Button variant="outline" className="flex-1 h-10 md:h-11 lg:h-12 xl:h-14 2xl:h-15 text-[14px] md:text-[16px] lg:text-[16px] xl:text-[17px] 2xl:text-[20px] rounded-[12px] sm:rounded-[15px] lg:rounded-[20px] border-2 border-primary font-bold text-primary hover:bg-primary/5 transition-all active:scale-[0.98]">
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-12 space-y-8 lg:space-y-12">
            <section className="mb-0">
              <h2>Course Overview</h2>
              <p className="text-text-main leading-relaxed text-sm md:text-base font-medium">
                {`This course introduces you to Data Science using Python, covering data analysis, visualization, and basic machine learning concepts. You'll learn how to work with real datasets, extract insights, and build data-driven solutions used in industry.`}
              </p>
            </section>

            <section className="mb-12 pt-11 rounded-[24px]">
              <h2>{`What You'll Learn`}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                {[
                  "Understand the complete Data Science workflow",
                  "Analyze data using Python libraries",
                  "Visualize data to uncover insights",
                  "Clean and prepare real-world datasets",
                  "Build basic machine learning models"
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="">
                      <Check className="w-4 h-3text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-sm md:text-base font-medium text-text-main">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2>Course Includes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {[
                  { icon: <Monitor className="w-8 h-8" />, text: "Real-world datasets" },
                  { icon: <FileText className="w-8 h-8" />, text: "Quizzes & assignments" },
                  { icon: <Layout className="w-8 h-8" />, text: "Hands-on mini project" },
                  { icon: <Award className="w-8 h-8" />, text: "Certificate of completion" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center w-full aspect-[1.65/1] border border-[#D2D2D2] rounded-[12px] bg-white gap-2 transition-shadow hover:shadow-sm p-2 lg:p-4">
                    <div className="text-text-main opacity-80 group-hover:opacity-100 transition-opacity">
                       {item.icon}
                    </div>
                    <span className="text-[13px] text-center font-medium text-text-main tracking-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2>Course Curriculum</h2>
              <Accordion type="single" collapsible className="w-full space-y-1" defaultValue="item-0">
                {modules.map((module, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-none">
                    <AccordionTrigger className="hover:no-underline py-3 cursor-pointer group">
                      <span className="text-sm md:text-base font-medium text-text-main">
                        {module.title} ({module.duration})
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 mt-1 border-l-2 md:border-l-4 border-[#D9D9D9] ml-0.5 md:ml-1 pl-4 md:pl-6">
                      <div className="space-y-1">
                        {module.lessons.map((lesson, j) => (
                          <LessonItem key={j} title={lesson.title} isPreview={lesson.isPreview} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section className="mb-12">
              <h2 className="text-primary">Certification</h2>
              <div className="space-y-3 md:mb-12">
                <h3 className="text-base md:text-[18px] font-bold text-text-main">Basic Life Support (BLS) Certificate</h3>
                <div className="space-y-2 md:space-y-2.5">
                  {[
                    "Hospital-compliant",
                    "Downloadable PDF",
                    "Shareable with HR/Admin"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2 items-center text-text-main font-medium">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-text-main" strokeWidth={2.5} />
                      <span className="text-sm md:text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-12">
               <h2>
                <span className="text-primary">Who</span> This Course Is For
              </h2>
              <div className="space-y-3 pl-1">
                {[
                  "Nurses",
                  "Doctors",
                  "Paramedics",
                  "Emergency staff",
                  "Hospital support staff",
                  "Clinical interns & trainees"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-3 mb-[2px]">
                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm md:text-base font-medium text-text-main">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
               <h2>
                Publisher <span className="text-primary">Info</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                    <Image 
                      src="/publisher.svg" 
                      alt="Publisher Logo" 
                      width={64} 
                      height={64}
                      className="object-cover w-full h-full" 
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-base md:text-[18px] font-bold text-text-main">Medicare</h3>
                    <p className="text-[12px] md:text-[13px] font-medium text-text-shaded">Publisher Rating <span className="text-text-main font-bold">4.1</span></p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-3 md:gap-y-4 pt-1">
                  <div className="flex items-center gap-2 md:gap-2.5">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-shaded">
                      <Users className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-semibold text-text-main whitespace-nowrap">1001 Students</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-2.5">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-shaded">
                      <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-semibold text-text-main whitespace-nowrap">45 courses</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-2.5">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-shaded">
                      <Star className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-semibold text-text-main whitespace-nowrap">3200+ Reviews</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 overflow-hidden">
              <CourseCarousel 
                highlight="Course"
                title="from Hammerbyte"
                items={[
                  {
                    title: "Front Desk Operations & PMS Basics",
                    author: "hammerbyte",
                    rating: 4,
                    reviewsCount: 402,
                    price: "365",
                    badgeText: "Popular",
                    image: "/course_preview_placeholder.png"
                  },
                  {
                    title: "Advanced Data Analytics with Python",
                    author: "hammerbyte",
                    rating: 5,
                    reviewsCount: 120,
                    price: "499",
                    badgeText: "Best Seller",
                    image: "/course_preview_placeholder.png",
                    isSelected: true
                  },
                  {
                    title: "Hospitality Management 101",
                    author: "hammerbyte",
                    rating: 4.5,
                    reviewsCount: 85,
                    price: "299",
                    badgeText: "New",
                    image: "/course_preview_placeholder.png"
                  },
                  {
                    title: "Marketing in Hospitality",
                    author: "hammerbyte",
                    rating: 4.2,
                    reviewsCount: 156,
                    price: "349",
                    badgeText: "Popular",
                    image: "/course_preview_placeholder.png"
                  },
                  {
                    title: "Medical Ethics for Doctors",
                    author: "hammerbyte",
                    rating: 4.9,
                    reviewsCount: 230,
                    price: "599",
                    badgeText: "Elite",
                    image: "/course_preview_placeholder.png"
                  },
                  {
                    title: "Emergency Response Training",
                    author: "hammerbyte",
                    rating: 4.7,
                    reviewsCount: 89,
                    price: "420",
                    badgeText: "Critical",
                    image: "/course_preview_placeholder.png"
                  }
                ]}
              />
            </section>

            {/* Related Topics Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-0">
                <h2>
                  <span className="text-primary">Related</span> Topics
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {["Artificial Intelligence", "Machine Learning"].map((topic, i) => (
                  <div key={i} className="px-5 md:px-8 py-2 md:py-2.5 border border-black rounded-[6px] md:rounded-[8px] transition-colors hover:bg-gray-50 cursor-pointer">
                    <span className="text-sm md:text-[16px] font-bold text-text-main">{topic}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Student Feedback Section */}
            <section className="mb-12">
              <h2>
                Student <span className="text-primary">feedback</span>
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-text-main leading-none">4.6</span>
                  <span className="text-sm md:text-[16px] font-bold text-text-main">Course Rating</span>
                </div>
                
                <div className="max-w-md space-y-3">
                  {[
                    { stars: 1, percentage: 52 },
                    { stars: 2, percentage: 30 },
                    { stars: 3, percentage: 22 },
                    { stars: 4, percentage: 20 },
                    { stars: 5, percentage: 2 }
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 w-8 shrink-0">
                        <span className="text-[16px] font-bold text-text-main">{row.stars}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 h-3 bg-yellow-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full" 
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="text-[16px] font-bold text-text-main w-10 text-right">{row.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Carousel */}
              <div className="pt-4 mb-12">
                <ShadcnCarousel
                  opts={{
                    align: "start",
                    loop: false,
                    dragFree: true,
                    containScroll: "trimSnaps",
                  }}
                  className="w-full relative"
                >
                  <ShadcnCarouselContent className="-ml-6 items-stretch">
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                      <ShadcnCarouselItem key={i} className="pl-6 basis-auto">
                        <ReviewCard 
                          userName="Shivam Patel"
                          rating={4.2}
                          comment="Provide useful content...."
                          timeAgo="2 months ago"
                          userImage="/sample-detail.png"
                        />
                      </ShadcnCarouselItem>
                    ))}
                  </ShadcnCarouselContent>
                </ShadcnCarousel>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


