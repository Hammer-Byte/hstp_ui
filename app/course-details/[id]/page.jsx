"use client";

import React from "react";
import { MobileView } from "../../course-detail/MobileView";
import { DesktopView } from "../../course-detail/DesktopView";

export default function CourseDetailPage() {
  return (
    <>
      {/* Mobile view visible on small screens, hidden on md+ */}
      <div className="md:hidden">
        <MobileView />
      </div>

      {/* Desktop view hidden on small screens, visible on md+ */}
      <div className="hidden md:block">
        <DesktopView />
      </div>
    </>
  );
}
