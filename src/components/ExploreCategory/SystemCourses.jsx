import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomButton from "../Buttons/CustomButton";
import "./SystemCourses.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const systemCourse = [
    {
        image: "/opera.png",
    },
    {
        image: "/cloudbeds.png",
    },
    {
        image: "/snt.png",
    },
    {
        image: "/ezee-absolute.png",
    },
    {
        image: "/hotelogix.png",
    },
    {
        image: "/rms.png",
    },
];
export default function SystemCourses() {
    return (
        <section class="system-course-section">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="section-title">
                    Hospitality <span>Systems Courses</span>
                </h2>
            </div>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={4}
                breakpoints={{
                    0: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 5 },
                }}
                navigation={{
                    prevEl: ".system-prev",
                    nextEl: ".system-next",
                }}
                pagination={{
                    el: ".system-dots",
                    clickable: true,
                }}
                className="system-swiper"
            >
                {systemCourse.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="system-course-card">
                            <img src={item.image} alt={item.category} />
                            <CustomButton className="view-btn">View</CustomButton>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="system-controls">
                <button className="system-prev"><FaChevronLeft /> </button>
                <div className="system-dots"></div>
                <button className="system-next"><FaChevronRight /></button>
            </div>
        </section>
    );
}