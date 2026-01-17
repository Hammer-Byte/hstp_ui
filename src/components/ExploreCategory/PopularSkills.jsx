import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomButton from "../Buttons/CustomButton";
import "./PopularSkills.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const popularSkills = [
    {
        image: "/waiter.png",
        title: "Guest Service Excellence",
    },
    {
        image: "/waiter.png",
        title: "Guest Service Excellence",
    },
    {
        image: "/waiter.png",
        title: "Guest Service Excellence",
    },
    {
        image: "/waiter.png",
        title: "Guest Service Excellence",
    },
    {
        image: "/waiter.png",
        title: "Guest Service Excellence",
    },
    {
        image: "/waiter.png",
        title: "Guest Service Excellence",
    },
];
export default function PopularSkills() {
    return (
        <section class="popular-skills-section">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="section-title">
                    Popular <span>Skills</span>
                </h2>
            </div>
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
                    prevEl: ".popular-skills-prev",
                    nextEl: ".popular-skills-next",
                }}
                pagination={{
                    el: ".popular-skills-dots",
                    clickable: true,
                }}
                className="popular-skills-swiper"
            >
                {popularSkills.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="popular-skills-card">
                            <img src={item.image} alt={item.category} />
                            <p>{item.title}</p>
                            <CustomButton className="view-btn">Learn more</CustomButton>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="popular-skills-controls">
                <button className="popular-skills-prev"><FaChevronLeft /> </button>
                <div className="popular-skills-dots"></div>
                <button className="popular-skills-next"><FaChevronRight /></button>
            </div>
        </section>
    );
}