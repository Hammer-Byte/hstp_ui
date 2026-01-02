"use client";

import useClickOutside from "@/app/hooks/useClickOutside";
import {
  User,
  Settings,
  CreditCard,
  Bell,
  HelpCircle,
  Users,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
/* ---------------- CONSTANTS ---------------- */

const PRIMARY_ACTIONS = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  {
    href: "/billing",
    label: "Billing",
    icon: CreditCard,
    badge: "PRO",
  },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

const SECONDARY_ACTIONS = [
  { href: "/team", label: "Team Members", icon: Users },
  { href: "/support", label: "Help & Support", icon: HelpCircle },
];

/* ---------------- COMPONENT ---------------- */

export default function UserMenu() {
  const router = useRouter();
  const menuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  /* -------- CLICK OUTSIDE -------- */

  /* -------- HANDLERS -------- */

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("activeHotel");
    }
    router.push("/login");
  }, [router]);

  useClickOutside(menuRef, closeMenu);
  /* -------- RENDER -------- */

  return (
    <div className="flex items-center gap-2 sm:gap-4 shrink-0 pl-4 bg-transparent">
      <div className="relative" ref={menuRef}>
        {/* TRIGGER */}
        <div
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground mt-1">Super Admin</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shadow-sm ring-2 ring-background group-hover:ring-primary/20 transition-all">
            JD
          </div>
        </div>

        {/* MENU */}
        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-popover shadow-xl animate-in fade-in zoom-in-95 duration-200 z-50 overflow-hidden">
            {/* HEADER */}
            <div className="px-4 py-3 border-b bg-muted/30">
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">
                john.doe@hammerbyte.co.in
              </p>
            </div>

            {/* PRIMARY */}
            <div className="p-1">
              {PRIMARY_ACTIONS.map(({ href, label, icon: Icon, badge }) => (
                <Link key={href} href={href} onClick={closeMenu}>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-md hover:bg-muted cursor-pointer transition-colors">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-1 justify-between items-center">
                      <span>{label}</span>
                      {badge && (
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">
                          {badge}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="h-px bg-border" />

            {/* SECONDARY */}
            <div className="p-1">
              {SECONDARY_ACTIONS.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={closeMenu}>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-foreground rounded-md hover:bg-muted cursor-pointer transition-colors">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{label}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="h-px bg-border" />

            {/* LOGOUT */}
            <div className="p-1">
              <div
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-destructive rounded-md hover:bg-destructive/10 cursor-pointer transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
