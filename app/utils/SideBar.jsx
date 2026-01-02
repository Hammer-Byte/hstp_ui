import React, { useRef, useState } from "react";
import { classNames } from "../../utils/classNames";
import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  Building2,
  Check,
  ChevronLeft,
  ChevronsUpDown,
  FileText,
  Home,
  LogOut,
  User,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { HOTELS } from "../../utils/hotels";

const Sidebar = ({ hotel, onHotelChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isHotelMenuOpen, setIsHotelMenuOpen] = useState(false);
  const router = useRouter();
  const hotelMenuRef = useRef(null);
  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
    setIsHotelMenuOpen(false);
  };

  const handleHotelChange = (selectedHotel) => {
    onHotelChange(selectedHotel);
    setIsHotelMenuOpen(false);
  };

  const nav = [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Trainings", icon: BookOpen, href: "/trainings" },
    { label: "Exams", icon: FileText, href: "/exams" },
    { label: "Certificates", icon: Award, href: "/certificates" },
    { label: "Profile", icon: User, href: "/profile" },
  ];

  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("activeHotel");
    router.push("/login");
  };
  return (
    <aside
      className={classNames(
        "fixed inset-y-0 left-0 z-50 bg-card border-r shadow-2xl md:shadow-none transition-all duration-300 ease-in-out flex flex-col",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* SIDEBAR HEADER */}
      <div
        className={classNames(
          "h-16 border-b flex items-center px-4 transition-all duration-300",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <div className="relative flex items-center justify-center h-8">
          <span
            className={classNames(
              "font-bold text-lg text-primary whitespace-nowrap absolute left-0 transition-all duration-300",
              collapsed
                ? "opacity-0 -translate-x-4 pointer-events-none"
                : "opacity-100 translate-x-0"
            )}
          >
            EduPlatform
          </span>
          <span
            className={classNames(
              "font-bold text-xl text-primary absolute transition-all duration-300",
              collapsed ? "opacity-100 scale-100" : "opacity-0 scale-0"
            )}
          >
            EP
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="absolute -right-3 top-13 z-50 hidden md:block">
          <Button
            onClick={toggleCollapse}
            className="h-6 w-6 rounded-full p-0 bg-background border border-border shadow-md text-muted-foreground flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary hover:scale-110 hover:shadow-lg"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <ChevronLeft
              className={classNames(
                "h-3 w-3 transition-transform duration-300",
                collapsed ? "rotate-180" : ""
              )}
            />
          </Button>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {nav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={classNames(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors relative overflow-hidden",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed ? "justify-center px-0" : ""
                )}
              >
                <item.icon
                  className={classNames(
                    "h-5 w-5 shrink-0 transition-all",
                    collapsed ? "mr-0" : ""
                  )}
                />
                <span
                  className={classNames(
                    "whitespace-nowrap transition-all duration-300 overflow-hidden",
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </Link>
              {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all pointer-events-none z-50 whitespace-nowrap border">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* SIDEBAR FOOTER */}
      <div className="p-4 border-t bg-muted/10 space-y-2">
        <div className="relative" ref={hotelMenuRef}>
          <div
            onClick={() => setIsHotelMenuOpen(!isHotelMenuOpen)}
            className={classNames(
              "flex items-center p-2 rounded-lg cursor-pointer border transition-all duration-200 hover:shadow-md bg-background/50 hover:bg-background",
              collapsed
                ? "justify-center px-0 w-10 h-10 mx-auto"
                : "justify-between gap-2",
              isHotelMenuOpen
                ? "ring-2 ring-primary/20 border-primary"
                : "border-border"
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-center h-6 w-6 rounded bg-primary text-primary-foreground shrink-0 shadow-sm">
                <Building2 className="h-3.5 w-3.5" />
              </div>
              <div
                className={classNames(
                  "flex flex-col items-start overflow-hidden transition-all duration-300",
                  collapsed ? "w-0 opacity-0 hidden" : "w-full opacity-100"
                )}
              >
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Workspace
                </span>
                <span className="text-xs font-semibold truncate max-w-[100px] leading-tight">
                  {hotel?.name}
                </span>
              </div>
            </div>

            {!collapsed && (
              <ChevronsUpDown className="h-3 w-3 text-muted-foreground shrink-0 opacity-50" />
            )}
          </div>

          {isHotelMenuOpen && (
            <div
              className={classNames(
                "absolute z-50 min-w-[240px] bg-popover rounded-xl border shadow-2xl p-1 animate-in fade-in zoom-in-95 duration-200",
                collapsed
                  ? "left-12 bottom-0 ml-2"
                  : "bottom-full left-0 w-full mb-2"
              )}
            >
              <div className="px-2 py-1.5 border-b mb-1">
                <h4 className="text-xs font-semibold text-foreground">
                  Switch Workspace
                </h4>
              </div>
              <div className="max-h-[200px] overflow-y-auto space-y-1">
                {HOTELS.map((h) => {
                  const isSelected = hotel?.id === h.id;
                  return (
                    <div
                      key={h.id}
                      onClick={() => handleHotelChange(h)}
                      className={classNames(
                        "flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer text-sm transition-colors",
                        isSelected
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Building2 className="h-4 w-4 shrink-0 opacity-70" />
                      <div className="flex flex-col flex-1">
                        <span>{h.name}</span>
                        {h.location && (
                          <span className="text-[10px] opacity-70 font-normal">
                            {h.location}
                          </span>
                        )}
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                    </div>
                  );
                })}
              </div>
              <div className="p-1 mt-1 border-t">
                <button className="w-full text-xs text-center py-1.5 text-muted-foreground hover:text-primary transition-colors hover:bg-muted rounded-md">
                  + Add New Property
                </button>
              </div>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          className={classNames(
            "w-full group hover:bg-destructive/10 hover:text-destructive",
            collapsed
              ? "justify-center px-0 h-10 w-10 mx-auto"
              : "justify-start gap-3"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
          <span
            className={classNames(
              "whitespace-nowrap transition-all duration-300 overflow-hidden text-muted-foreground group-hover:text-destructive",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            Logout
          </span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
