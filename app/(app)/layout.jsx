"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, ArrowLeft } from "lucide-react";
import UserMenu from "./components/UserMenu";
import BreadCrumbs from "./components/BreadCrumbs";
import SideBar from "./components/SideBar";
import { classNames } from "../utils/classNames";
import { HOTELS } from "../utils/hotels";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hotel, setHotel] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const storedHotel = localStorage.getItem("activeHotel");
    if (storedHotel) {
      const parsed = JSON.parse(storedHotel);
      const validHotel = HOTELS.find((h) => h.id === parsed?.id);
      setHotel(validHotel || HOTELS[0]);
    } else {
      setHotel(HOTELS[0]);
    }

    const storedCollapse = localStorage.getItem("sidebarCollapsed");
    if (storedCollapse) {
      setCollapsed(JSON.parse(storedCollapse));
    }
  }, []);

  const handleHotelChange = (selectedHotel) => {
    setHotel(selectedHotel);
    localStorage.setItem("activeHotel", JSON.stringify(selectedHotel));
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(next));
      return next;
    });
  };

  if (!isMounted) return null;

  const showBack = pathname !== "/dashboard";

  return (
    <div className="min-h-screen bg-background">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <SideBar
        hotel={hotel}
        onHotelChange={handleHotelChange}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={classNames(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          collapsed ? "md:ml-20" : "md:ml-64"
        )}
      >
        <header className="sticky top-0 z-30 h-16 w-full bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Button
              size="icon"
              variant="outline"
              className="md:hidden h-9 w-9 shrink-0"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {showBack && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0"
                  onClick={() => {
                    if (window.history.length > 2) {
                      router.back();
                    } else {
                      router.push("/dashboard");
                    }
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="h-4 w-px bg-border hidden sm:block shrink-0" />
              </>
            )}

            <BreadCrumbs />
          </div>

          <UserMenu />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div
            key={hotel?.id}
            className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
