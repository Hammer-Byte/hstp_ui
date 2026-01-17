"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./SkillsSwiper.css";
import { BiChevronRight } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const skills = [
  {
    title: "Cleanliness, quality & room standards.",
    category: "Housekeeping",
    image: "/skills-img.jpg",
  },
  {
    title: "Daily operations made seamless.",
    category: "Hotel Operations",
    image: "/skills-img.jpg",
  },
  {
    title: "Consistency across every service.",
    category: "SOPs & Standards",
    image: "/skills-img.jpg",
  },
  {
    title: "Protect guests, staff & property.",
    category: "Safety & Compliance",
    image: "/skills-img.jpg",
  },
  {
    title: "Protect guests, staff & property.",
    category: "Safety & Compliance",
    image: "/skills-img.jpg",
  },
  {
    title: "Protect guests, staff & property.",
    category: "Safety & Compliance",
    image: "/skills-img.jpg",
  },
];

export default function SkillsSwiper() {
  return (
    <section className="skills-section">
      <h2 className="skills-heading">
        Learn Skills <span>That Matter.</span>
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: ".skills-prev",
          nextEl: ".skills-next",
        }}
        pagination={{
          el: ".skills-dots",
          clickable: true,
        }}
        className="skills-swiper"
      >
        {skills.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="skill-card">
              <div className="skill-img-wrapper">
                <img src={item.image} alt={item.category} />
                <div className="skill-overlay">
                  <p>{item.title}</p>
                </div>
              </div>
              <div className="skill-footer">
                <span>{item.category}</span>
                <button className="arrow-btn"><BiChevronRight /></button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="skills-controls">
        <button className="skills-prev"><FaChevronLeft /></button>
        <div className="skills-dots"></div>
        <button className="skills-next"><FaChevronRight /></button>
      </div>
    </section>
  );
}
