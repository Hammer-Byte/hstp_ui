import "./footer.css";

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="footer-wrapper">
                <div className="footer-logo">
                    <h3>Logo</h3>
                </div>
                <div className="footer-content">
                    <div className="footer-column">
                        <h6>Explore</h6>
                        <ul>
                            <li>Courses</li>
                            <li>Categories</li>
                            <li>Popular Skills</li>
                            <li>Certifications</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h6>For Learners</h6>
                        <ul>
                            <li>My Dashboard</li>
                            <li>My Courses</li>
                            <li>Certificates</li>
                            <li>Support</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h6>For Hotels</h6>
                        <ul>
                            <li>Train Your Team</li>
                            <li>Corporate Plans</li>
                            <li>Admin Dashboard</li>
                            <li>Compliance Tracking</li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h6>Company</h6>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Blog / Resources</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                © name
            </div>
        </footer >
    )
}