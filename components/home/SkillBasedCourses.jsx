"use client";

import React from "react";
import { cn } from "@/lib/utils";
import SkillBasedCard from "@/components/shared/SkillBasedCard";

const SkillBasedCourses = ({ className }) => {
  const learningPaths = [
    {
      title: "Hospitality Industry SOPs",
      rating: 4.7,
      badge: "Best Selling Category",
      personImage: "/sample-course.png"
    },
    {
      title: "Hospitality Industry SOPs",
      rating: 4.7,
      badge: "Best Selling Category",
      personImage: "/sample-course.png"
    },
    {
      title: "Hospitality Industry SOPs",
      rating: 4.7,
      badge: "Best Selling Category",
      personImage: "/sample-course.png"
    }
  ];

  return (
    <section className={cn("w-full", className)}>
      <div className="container mx-auto flex flex-col gap-10">
        <h2 className="text-text-main">
          Skill-Based <span className="text-primary">Learning Paths</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 2xl:gap-12 justify-center">
          {learningPaths.map((path, index) => (
            <SkillBasedCard
              key={index}
              {...path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillBasedCourses;
