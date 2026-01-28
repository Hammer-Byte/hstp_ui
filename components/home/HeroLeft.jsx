import React from "react";
import { Button } from "@/components/ui/button";
export default function HeroLeft() {
  return (
    <div className="flex flex-col gap-4 text-[var(--color-surface)]">
      <h1 className="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
        Build World-Class Hospitality <br className="hidden md:block" />
        Skills.
      </h1>
      <p className="text-lg leading-relaxed max-w-lg">
        Professional training for hotel staff, supervisors, and managers-learn
        anytime, anywhere.
      </p>
      <div className="mt-4">
        <Button className="bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full px-10 py-7 text-lg font-medium shadow-lg hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-all duration-300">
          Browse Course
        </Button>
      </div>
    </div>
  );
}
