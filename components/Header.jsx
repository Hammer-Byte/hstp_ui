'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Globe, ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b bg-[#FAFAFA] backdrop-blur-none shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-5 flex-1 md:flex-none">
            {/* Mobile Menu - Visible below xl */}
            <div className="xl:hidden">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-full w-[280px]">
                  <DrawerHeader className="border-b pb-4">
                    <DrawerTitle className="text-left">Navigation</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col p-4 space-y-4">
                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-text-shaded uppercase tracking-wider mb-2">Main Menu</p>
                       <Link href="/categories" className="flex items-center py-2 text-base font-medium text-text-main hover:text-primary transition-colors">
                        Explore Categories
                      </Link>
                      <Link href="/certifications" className="flex items-center py-2 text-base font-medium text-text-main hover:text-primary transition-colors">
                        Certifications
                      </Link>
                      <Link href="/about" className="flex items-center py-2 text-base font-medium text-text-main hover:text-primary transition-colors">
                        About
                      </Link>
                    </div>
                    
                    {!isAuthPage && (
                      <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                         <p className="text-[10px] font-bold text-text-shaded uppercase tracking-wider mb-2">Account</p>
                        <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary/5">
                          Sign-Up
                        </Button>
                        <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
                          Sign-In
                        </Button>
                      </div>
                    )}
                  </div>
                  <DrawerFooter className="border-t">
                    <div className="flex items-center justify-between text-muted-foreground text-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>English</span>
                      </div>
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>

            {/* Logo */}
            <div className="flex shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">Name/logo</span>
              </Link>
            </div>

            {/* Search Bar - Hidden on small screens, expands on lg */}
            <div className="hidden sm:flex items-center px-1 md:px-2 flex-1 md:flex-none">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search learning"
                  className="pl-9 bg-[#F0F2F5] border-transparent focus:border-primary h-9 md:h-10 rounded-full w-full md:w-[250px] lg:w-[350px] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Center: Navigation Links - Visible on xl+ */}
          <nav className="hidden items-center space-x-6 text-sm font-medium xl:flex">
            <Link href="/categories" className="transition-colors hover:text-primary relative group whitespace-nowrap">
              Explore Categories
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="/certifications" className="transition-colors hover:text-primary relative group whitespace-nowrap">
              Certifications
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary relative group whitespace-nowrap">
              About
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 md:space-x-3">
             {/* Mobile Search - Visible on xs */}
            <Button variant="ghost" size="icon" className="sm:hidden h-9 w-9">
              <Search className="h-5 w-5" />
            </Button>

            <button className="p-2 transition-colors hover:text-primary shrink-0">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <div className="hidden items-center space-x-2 md:flex">
              {!isAuthPage && <Button variant="outline" className="rounded-full px-4 xl:px-6 border-primary text-primary hover:bg-primary/5 transition-all text-sm h-9 xl:h-10">
                Sign-Up
              </Button>}
              {!isAuthPage && <Button className="rounded-full px-4 xl:px-6 bg-primary hover:bg-primary/90 transition-all text-sm h-9 xl:h-10">
                Sign-In
              </Button>}
            </div>
            {/* Language Picker - Hidden on lg below? Let's keep it but maybe hide on small mobile */}
            <button className="hidden sm:flex items-center space-x-1 p-2 transition-colors hover:text-primary shrink-0">
              <Globe className="h-5 w-5" />
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
