import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row min-h-[400px]">
      {/* Left Section - White */}
      <div className="md:w-1/4 bg-white flex items-center justify-center p-12 border-t">
        <h2 className="text-3xl font-bold text-foreground">Logo</h2>
      </div>

      {/* Right Section - Purple */}
      <div className="md:w-3/4 bg-primary text-primary-foreground p-12 md:p-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {/* Explore */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 text-primary-foreground">Explore</h3>
            <ul className="space-y-3 text-primary-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Popular Skills</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Certifications</Link></li>
            </ul>
          </div>

          {/* For Learners */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 text-primary-foreground">For Learners</h3>
            <ul className="space-y-3 text-primary-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">My Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">My Courses</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Certificates</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* For Hotels */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 text-primary-foreground">For Hotels</h3>
            <ul className="space-y-3 text-primary-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">Train Your Team</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Corporate Plans</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Compliance Tracking</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 text-primary-foreground">Company</h3>
            <ul className="space-y-3 text-primary-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog / Resources</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
