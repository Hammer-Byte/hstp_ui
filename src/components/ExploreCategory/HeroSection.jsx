import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      {/* <div className="hero-container"> */}
        <div className="hero-content">
          <h1>
            Build World-Class Hospitality <br />
            Skills.
          </h1>

          <p>
            Professional training for hotel staff, supervisors, and managers –
            learn anytime, anywhere.
          </p>

          <button className="hero-btn">Browse Course</button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <img
            src="/portrait-people.png"
            alt="Hospitality Professionals"
          />
        </div>
      {/* </div> */}
    </section>
  );
}
