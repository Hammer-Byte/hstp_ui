"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  return (
    <>
      <Header />
      {children}
      {!isAuthRoute && <Footer />}
    </>
  );
}
