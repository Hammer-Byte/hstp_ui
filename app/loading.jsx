import React from "react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white z-50 fixed inset-0">
      <div className="flex flex-col items-center gap-4">
        {/* Modern high-quality spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
        <p className="text-gray-500 font-medium animate-pulse text-[18px]">Loading Hammerbyte...</p>
      </div>
    </div>
  );
}
