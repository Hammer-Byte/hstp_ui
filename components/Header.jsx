'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#FAFAFA] backdrop-blur-none shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            {/* Logo */}
            <div className="flex shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold tracking-tight text-foreground">Name/logo</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden items-center px-2 md:flex">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search learning"
                  className="pl-9 bg-[#F0F2F5] border-transparent focus:border-primary h-10 rounded-full w-[350px]"
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden items-center space-x-6 text-sm font-medium lg:flex">
            <Link href="/categories" className="transition-colors hover:text-primary relative group">
              Explore Categories
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="/certifications" className="transition-colors hover:text-primary relative group">
              Certifications
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary relative group">
              About
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 transition-colors hover:text-primary">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <div className="hidden items-center space-x-2 sm:flex">
              {!isAuthPage && <Button variant="outline" className="rounded-full px-6 border-primary text-primary hover:bg-primary/5">
                Sign-Up
              </Button>}
              {!isAuthPage && <Button className="rounded-full px-6 bg-primary hover:bg-primary/90">
                Sign-In
              </Button>}
            </div>
            <button className="flex items-center space-x-1 p-2 transition-colors hover:text-primary">
              <Globe className="h-5 w-5" />
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
