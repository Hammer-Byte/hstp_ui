import HeroSection from "../../components/ExploreCategory/HeroSection";
import IndustryExpert from "../../components/ExploreCategory/IndustryExpert";
import PopularCourses from "../../components/ExploreCategory/PopularCourses";
import PopularSkills from "../../components/ExploreCategory/PopularSkills";
import SkillLearningPath from "../../components/ExploreCategory/SkillLearningPath";
import SkillsSwiper from "../../components/ExploreCategory/SkillsSwiper";
import SystemCourses from "../../components/ExploreCategory/SystemCourses";
import Testimonials from "../../components/ExploreCategory/Testimonial";

export default function ExploreCategories() {
    return (
        <>
            <HeroSection />
            <SkillsSwiper />
            <PopularCourses />
            <IndustryExpert />
            <SkillLearningPath />
            <SystemCourses />
            <PopularSkills />
            <Testimonials />
        </>
    );
};