import CustomButton from "../Buttons/CustomButton";
import "./IndustryExpert.css";

export default function IndustryExpert() {
    return (
        <section class="experts-section">
            <h2 class="section-title">
                Learn From <span>Industry Experts</span>
            </h2>
            <div class="expert-card">
                <div class="expert-left">
                    <h3 class="expert-title">Authority & credibility</h3>

                    <div class="features d-flex flex-wrap gap-5">
                        <span class="feature-pill"><img src="/teacher1.png" alt="teacher 1" />Experienced professionals</span>
                        <span class="feature-pill"><img src="/research.png" alt="research" /> Real-world case studies</span>
                        <span class="feature-pill"><img src="/teacher2.png" alt="teacher 2" /> Practical teaching approach</span>
                    </div>

                    <p class="expert-desc">
                        Learn directly from experienced hospitality professionals
                        with real-world expertise.
                    </p>

                    <CustomButton class="custom-btn">More info</CustomButton>
                </div>
                <div class="expert-right">
                    <img
                        src="/expert-right.png"
                        alt="Expert"
                        class="expert-img"
                    />
                </div>
            </div>
        </section>

    );
}