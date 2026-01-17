import { Container, Tab, Nav, Button, Card } from "react-bootstrap";
import "./PopularCourses.css";
import Rating from "../Rating";
import CustomButton from "../Buttons/CustomButton";

const courses = Array(6).fill({
    title: "Front Desk Operations & PMS Basics",
    author: "by hammad",
    rating: 4.5,
    reviews: 402,
    price: "₹ 365/-",
    image: "/popular-course.jpg",
});

export default function PopularCourses() {
    return (
        <section className="popular-courses">
            {/* <Container> */}
            <h2 className="section-title">
                Popular <span>Courses</span>
            </h2>

            <Tab.Container defaultActiveKey="food">
                {/* Tabs */}
                <Nav variant="underline" className="course-tabs">
                    <Nav.Item>
                        <Nav.Link eventKey="food">Food & Beverage</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="hotel">Hotel Operations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="sop">SOPs & Standards</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="safety">Safety & Compliance</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Tab Content */}
                <Tab.Content>
                    <Tab.Pane eventKey="food">
                        <div className="course-scroll">
                            {courses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <div className="img-wrap">
                                        <img src={course.image} alt={course.title} />
                                        <span className="badge-popular">
                                            <img src={"/fire.png"} />
                                            Popular</span>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">{course.title}</h5>
                                        <p className="author">{course.author}</p>

                                        <div className="rating">
                                            <Rating value={course.rating}/>
                                            <img src={"/people-img.png"} alt="people img" className="mx-0.5" />
                                            <span>({course.reviews})</span>
                                        </div>

                                        <span className="best-seller">Best Seller</span>

                                        <div className="price">{course.price}</div>

                                        <CustomButton variant="primary">Purchase</CustomButton>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Button */}
                        <div className="browse-btn-wrap">
                            <Button variant="link" className="browse-btn">
                                Browse all courses →
                            </Button>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            {/* </Container> */}
        </section>
    );
}
