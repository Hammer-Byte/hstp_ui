"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Star, 
  Check, 
  Play, 
  Clock, 
  Globe, 
  Award, 
  Plus,
  ArrowLeft,
  Bookmark,
  Users,
  GraduationCap,
  Edit
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReviewCard from "@/components/shared/ReviewCard";
import { 
  Carousel as ShadcnCarousel, 
  CarouselContent as ShadcnCarouselContent, 
  CarouselItem as ShadcnCarouselItem
} from "@/components/ui/carousel";

export function MobileView() {
  const params = useParams();
  const learningObjectives = [
    "Recognize cardiac and respiratory emergencies.",
    "Perform high-quality CPR for adults, children, and infants.",
    "Use an Automated External Defibrillator (AED) correctly.",
    "Manage choking situations effectively.",
    "Work efficiently as part of a resuscitation team."
  ];

  const modules = [
    { title: "Module 1: Introduction to BLS", duration: "10 min" },
    { title: "Module 2: Scene Safety & Patient Assessment", duration: "15 min" },
    { title: "Module 3: High-Quality CPR – Adults", duration: "35 min" },
    { title: "Module 4: CPR for Children & Infants", duration: "25 min" },
    { title: "Module 5: Automated External Defibrillator (AED) Use", duration: "20 min" }
  ];

  const certificationItems = [
    "Hospital-compliant",
    "Downloadable PDF",
    "Shareable with HR/Admin"
  ];

  const targetAudience = [
    "Nurses",
    "Doctors",
    "Paramedics",
    "Emergency staff",
    "Hospital support staff",
    "Clinical interns & trainees"
  ];

  const ratings = [
    { stars: 1, percentage: 52 },
    { stars: 2, percentage: 30 },
    { stars: 3, percentage: 22 },
    { stars: 4, percentage: 20 },
    { stars: 5, percentage: 2 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white md:hidden font-dm-sans pb-20">
      {/* Hero Header */}
      <div className="relative w-full aspect-4/3 rounded-b-[30px] overflow-hidden shadow-lg">
        <Image 
          src="/sample-detail.png" 
          alt="Course Pitch" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Top Floating Icons */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
          <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform">
            <ArrowLeft size={24} />
          </button>
          <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform">
            <Bookmark size={20} />
          </button>
        </div>

        {/* Center Pitch Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm p-1 border border-white/40">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-[#673AB7]">
              <Play size={28} fill="currentColor" className="ml-1" />
            </div>
          </div>
          <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">show pitch</span>
        </div>

        {/* Bottom Banner */}
        <div className="absolute bottom-4 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <Globe size={12} className="text-black" />
          </div>
          <span className="text-white text-[10px] font-medium italic">certificate included</span>
        </div>
      </div>

      {/* Course Info Section */}
      <div className="px-5 pt-6 space-y-5">
        {/* Rating Row */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#1A1A1A]">4.2</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < 4 ? "fill-[#FACC15] text-[#FACC15]" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-[12px] font-medium text-gray-400 opacity-80">(499)</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h1 className="text-[26px] font-bold text-[#673AB7] leading-tight">
            Basic Life Support (BLS)
            <Link href={`/edit-course/${params?.id || '1'}`} className="inline-block ml-2 align-baseline cursor-pointer">
              <Edit className="w-5 h-5 inline text-[#673AB7] hover:opacity-80" />
            </Link>
          </h1>
          <p className="text-sm font-medium text-gray-500">By medmedia</p>
        </div>

        <p className="text-[15px] font-normal text-[#1A1A1A] leading-normal opacity-90">
          Basic Life Support (BLS) is a critical emergency training program designed for hospital staff to respond effectively to life-threatening situations such as cardiac arrest, respiratory failure, and choking.
        </p>

        {/* Info Icons Row */}
        <div className="flex items-center gap-6 pt-2 pb-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
               <Globe size={18} />
            </div>
            <span className="text-[13px] font-bold text-[#1A1A1A]">English, Hindi</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
               <Clock size={18} />
            </div>
            <span className="text-[13px] font-bold text-[#1A1A1A]">4.2 Hours</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
               <Globe size={18} />
            </div>
            <span className="text-[13px] font-bold text-[#1A1A1A]">English</span>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Learning Objectives</h2>
          <div className="space-y-3">
            {learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={18} className="text-[#1A1A1A] mt-0.5 shrink-0" strokeWidth={3} />
                <span className="text-[14px] font-medium text-[#1A1A1A] leading-normal">{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA - Bottom Sticky-ish Row */}
        <div className="py-6 space-y-4">
          <div className="text-3xl font-bold text-[#1A1A1A]">₹ 4999/-</div>
          <div className="flex items-center gap-4">
            <Button className="flex-1 h-14 bg-[#673AB7] hover:bg-[#5a32a3] text-white text-lg font-bold rounded-[15px] shadow-lg shadow-[#673AB7]/20">
              Purchase
            </Button>
            <button className="text-[18px] font-bold text-[#1A1A1A] active:opacity-60 px-2 transition-opacity">
              Add to cart
            </button>
          </div>
        </div>

        {/* Course Curriculum */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#1A1A1A]">Course <span className="text-[#673AB7]">Contains</span></h2>
          </div>
          
          {/* Module/Lecture Pills */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-16 rounded-[12px] border border-gray-200 flex items-center justify-center relative overflow-hidden group active:border-[#673AB7] transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#673AB7]/10" />
              <span className="text-[16px] font-bold text-[#1A1A1A]">5 Modules</span>
              <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-100" />
            </div>
            <div className="flex-1 h-16 rounded-[12px] border border-gray-200 flex items-center justify-center relative overflow-hidden group active:border-[#673AB7] transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#673AB7]/10" />
              <span className="text-[16px] font-bold text-[#1A1A1A]">15 Lectures</span>
              <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-100" />
            </div>
          </div>

          <div className="space-y-3">
            {modules.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 active:bg-gray-50/50 transition-colors cursor-pointer">
                <span className="text-[14px] font-bold text-[#1A1A1A]">{m.title} ({m.duration})</span>
                <Plus size={20} className="text-[#673AB7]" />
              </div>
            ))}
          </div>
        </div>

        {/* Certification */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-[#673AB7]">Certification</h2>
          <div className="space-y-3">
            <h3 className="text-[15px] font-bold text-[#1A1A1A]">Basic Life Support (BLS) Certificate</h3>
            <div className="space-y-2.5">
              {certificationItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={16} className="text-[#1A1A1A]" strokeWidth={2.5} />
                  <span className="text-[14px] font-medium text-[#1A1A1A]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who This Course Is For */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-[#1A1A1A]"><span className="text-[#673AB7]">Who</span> This Course Is For</h2>
          <div className="space-y-3 pl-1">
            {targetAudience.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#673AB7]" />
                <span className="text-[14px] font-medium text-[#1A1A1A]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Publisher Info */}
        <div className="space-y-6 pt-6">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Publisher <span className="text-[#673AB7]">Info</span></h2>
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
                <Image src="/publisher.svg" alt="logo" width={40} height={40} />
             </div>
             <div className="space-y-0.5">
                <h3 className="text-[16px] font-bold text-[#1A1A1A]">Medicare</h3>
                <p className="text-[12px] font-medium text-gray-500">Publisher Rating <span className="text-[#1A1A1A] font-bold">4.1</span></p>
             </div>
          </div>
          <div className="flex items-center gap-8 pt-1">
              <div className="flex flex-col gap-1 items-center">
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                    <Users size={20} />
                 </div>
                 <span className="text-[11px] font-bold text-[#1A1A1A]">100 Students</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                    <GraduationCap size={20} />
                 </div>
                 <span className="text-[11px] font-bold text-[#1A1A1A]">45 courses</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                    <Star size={20} />
                 </div>
                 <span className="text-[11px] font-bold text-[#1A1A1A]">Reviews</span>
              </div>
          </div>
          <button className="text-[13px] font-bold text-[#673AB7] underline active:opacity-60 transition-opacity">See all courses</button>
        </div>

        {/* Feedback Section */}
        <div className="space-y-8 pt-8">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Student <span className="text-[#673AB7]">feedback</span></h2>
          
          <div className="space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-[44px] font-bold text-[#1A1A1A] leading-none">4.6</span>
              <span className="text-[15px] font-bold text-[#1A1A1A]">Course Rating</span>
            </div>

            <div className="space-y-3.5">
              {ratings.map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 w-10">
                    <span className="text-[16px] font-bold text-[#1A1A1A]">{row.stars}</span>
                    <Star size={16} className="fill-[#FACC15] text-[#FACC15]" />
                  </div>
                  <div className="flex-1 h-2.5 bg-[#FFF7E1] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FACC15] rounded-full" 
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="text-[15px] font-bold text-[#1A1A1A] w-10 text-right">{row.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial List */}
          <div className="space-y-6 pt-2">
              {[1, 2].map((_, i) => (
                <div key={i} className="space-y-3 border-b border-gray-50 pb-6">
                   <h4 className="text-[15px] font-bold text-[#1A1A1A]">Shivam Patel</h4>
                   <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className={j < 4 ? "fill-[#FACC15] text-[#FACC15]" : "text-gray-200"} />
                      ))}
                      <span className="text-[12px] font-bold ml-2 text-[#1A1A1A]">4.2</span>
                   </div>
                   <p className="text-[14px] font-medium text-gray-600 leading-normal">
                      Provide useful content....
                   </p>
                   <span className="text-[12px] font-medium text-gray-400 block pt-1">2 months ago</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
