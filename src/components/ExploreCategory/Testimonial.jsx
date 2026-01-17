import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Testimonial.css";
import Rating from "../Rating";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const testimonial = [
    {
        image: "/testimonial-img.png",
        name: "Hina khan",
        position: "Hotel Manager",
        rating: 4.6,
        description: "The training helped me handle guests more confidently at the front desk."
    },
    {
        image: "/testimonial-img.png",
        name: "Hina khan",
        position: "Hotel Manager",
        rating: 4.6,
        description: "The training helped me handle guests more confidently at the front desk."
    },
    {
        image: "/testimonial-img.png",
        name: "Hina khan",
        position: "Hotel Manager",
        rating: 4.6,
        description: "The training helped me handle guests more confidently at the front desk."
    },
    {
        image: "/testimonial-img.png",
        name: "Hina khan",
        position: "Hotel Manager",
        rating: 4.6,
        description: "The training helped me handle guests more confidently at the front desk."
    },
    {
        image: "/testimonial-img.png",
        name: "Hina khan",
        position: "Hotel Manager",
        rating: 4.6,
        description: "The training helped me handle guests more confidently at the front desk."
    },
    {
        image: "/testimonial-img.png",
        name: "Hina khan",
        position: "Hotel Manager",
        rating: 4.6,
        description: "The training helped me handle guests more confidently at the front desk."
    },
];
export default function Testimonials() {
    return (
        <section className="testimonial-section">
            <h2 className="section-title">
                Testimonials & Success Stories
            </h2>
            <div className="testimonial-inner">
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
                        prevEl: ".testimonial-prev",
                        nextEl: ".testimonial-next",
                    }}
                    pagination={{
                        el: ".testimonial-dots",
                        clickable: true,
                    }}
                    className="testimonial-swiper"
                >
                    {testimonial.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="testimonial-card">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <img src={item.image} />
                                    <div className="d-flex flex-column">
                                        <h6>{item.name}</h6>
                                        <p>{item.position}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <Rating value={item.rating} />
                                    <span>{item.rating}</span>
                                </div>
                                <h5>{item.description}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="testimonial-controls">
                    <button className="testimonial-prev"><FaChevronLeft /> </button>
                    <div className="testimonial-dots"></div>
                    <button className="testimonial-next"><FaChevronRight /></button>
                </div>
            </div>
        </section>
    );
}