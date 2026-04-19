/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Globe, ChevronDown, Menu, ArrowRight } from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COURSE_DATA, CATEGORIES } from '@/app/(app)/constant';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import categoryService from '@/services/categoryService';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Dynamic API categories
  const { data: apiCategories } = useQuery({
    queryKey: ['course-categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Prevents refetching when switching tabs
    refetchOnMount: false, // Relies on the hydration data for initial load
  });

  // Use API data if available, otherwise fallback to an empty array
  const categoriesList = apiCategories?.length > 0 
    ? apiCategories
    : [];

  const filteredCourses = COURSE_DATA.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const categories = categoriesList;
  return (
    <header className="sticky top-0 z-50 w-full h-16 md:h-20 border-b border-white/10 bg-primary md:bg-white text-white md:text-black shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-5 flex-1 md:flex-none">
            {/* Mobile Menu - Visible below xl */}
            <div className="xl:hidden">
              <Drawer direction="left" open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10 hover:text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-full w-[280px]">
                  <DrawerHeader className="border-b pb-4">
                    <DrawerTitle className="text-left">Navigation</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col p-4 space-y-4">
                    <div className="space-y-1">
                       {/* <p className="text-[10px] font-bold text-text-shaded uppercase tracking-wider mb-2">Main Menu</p> */}
                       
                       {/* Mobile Categories Accordion */}
                       <Accordion type="single" collapsible className="w-full border-none">
                         <AccordionItem value="categories" className="border-none">
                           <AccordionTrigger className="flex items-center py-3 text-base font-medium text-text-main hover:text-primary transition-colors hover:no-underline">
                             Explore Categories
                           </AccordionTrigger>
                           <AccordionContent className="pb-2">
                             <div className="flex flex-col pl-4 space-y-1 border-l-2 border-gray-100 ml-1">
                               {categories.map((category, index) => (
                                 <Link
                                   key={category.id || index}
                                   href={`/category/${category.id}`}
                                   className="py-2.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                                 >
                                   {category.title}
                                 </Link>
                               ))}
                             </div>
                           </AccordionContent>
                         </AccordionItem>
                       </Accordion>

                       <Link href="/certifications" className="flex items-center py-3 text-base font-medium text-text-main hover:text-primary transition-colors">
                        Certifications
                      </Link>
                      <Link href="/about" className="flex items-center py-3 text-base font-medium text-text-main hover:text-primary transition-colors">
                        About
                      </Link>
                    </div>
                    
                    {!isAuthPage && (
                      <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                        <p className="text-[10px] font-bold text-text-shaded uppercase tracking-wider mb-2">Account</p>
                        <Button 
                          className="w-full rounded-full bg-primary hover:bg-primary/90 font-bold"
                          onClick={() => router.push('/login')}
                        >
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
            <div className="flex shrink-0 ml-1">
              <Link href="/" className="flex items-center">
                <span className="text-[17px] md:text-xl font-semibold tracking-wide text-white md:text-black">App Name</span>
              </Link>
            </div>

            {/* Search Bar - Hidden on small screens, expands on lg */}
            <div className="hidden md:flex items-center px-1 md:px-2 flex-1 md:flex-none">
              <div className="relative w-full group">
                <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-primary' : 'text-muted-foreground'}`} />
                <Input
                  type="search"
                  placeholder="Search learning"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="pl-9 bg-[#F0F2F5] border-transparent focus:border-primary focus:bg-white h-9 md:h-10 rounded-full w-full md:w-[250px] lg:w-[350px] transition-all"
                />

                {/* Search Results Dropdown */}
                {isSearchFocused && (searchQuery || filteredCourses.length > 0) && (
                  <div className="absolute top-full left-0 mt-2 w-full md:w-[350px] lg:w-[450px] bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      {filteredCourses.length > 0 ? (
                        <>
                          <p className="text-[10px] font-bold text-text-shaded uppercase tracking-wider px-3 py-2">Suggested Courses</p>
                          {filteredCourses.map((course, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                router.push(`/course-detail`);
                                setSearchQuery('');
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg group transition-colors text-left"
                            >
                              <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden shrink-0">
                                <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">{course.title}</h4>
                                <p className="text-xs text-gray-500 truncate">Course • {course.author}</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </button>
                          ))}
                        </>
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <p className="text-sm text-gray-500">No results found for &quot;{searchQuery}&quot;</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <nav className="hidden items-center space-x-6 text-sm font-medium xl:flex">
            {/* Explore Categories Dropdown */}
            <div 
              className="relative py-4 hover:text-primary cursor-pointer"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div 
                className="flex items-center gap-1 transition-colors hover:text-primary relative whitespace-nowrap cursor-pointer select-none"
              >
                Explore Categories
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMenuOpen ? "rotate-180 text-primary" : ""}`} />
              </div>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 w-[320px] bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden transition-all duration-300 z-60 
                ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}>
                <div className="py-2">
                  {categories.map((category, index) => (
                    <Link
                      key={category.id || index}
                      href={`/category/${category.id}`}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 group transition-colors border-b border-gray-50 last:border-0"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                        {category.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary" />
                    </Link>
                  ))}
                  {categories.length === 0 && (
                    <div className="px-6 py-8 text-center">
                      <p className="text-sm text-gray-500 italic">No categories available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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

            <button className="p-2 transition-colors hover:bg-white/10 rounded-full shrink-0 mr-0 md:mr-4">
              <ShoppingBag className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
            </button>
            <div className="hidden items-center space-x-2 md:flex">
              {!isAuthPage && 
              <Button 
                className="rounded-full px-4 xl:px-6 bg-white text-[#3F11A4] hover:bg-white/90 transition-all text-sm h-9 xl:h-10 font-bold"
                onClick={() => router.push('/login')}
              >
                Sign-In
              </Button>}
            </div>
            {/* Language Picker - Hidden on lg below? Let's keep it but maybe hide on small mobile */}
            {/* <button className="hidden sm:flex items-center space-x-1 p-2 transition-colors hover:text-primary shrink-0">
              <Globe className="h-5 w-5" />
              <ChevronDown className="h-4 w-4" />
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
