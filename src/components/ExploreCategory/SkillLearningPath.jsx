import { BsArrowRight, BsFillStarFill } from 'react-icons/bs';
import './SkillLearningPath.css';
import { BiArrowFromRight } from 'react-icons/bi';

export default function SkillLearningPath() {
    return (
        <section class="skills-path-section">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="section-title">
                    Skill-Based <span>Learning Paths</span>
                </h2>
            </div>
            <div className='skills-inner'>
                <div className='skills-card'>
                    <div className='skills-bg'>
                        <img src='/man.png' alt='man pic' className='man-img' />
                        <img src='/reception.png' alt='reception pic' className='reception-img' />
                    </div>
                    <div className='skills-content px-4 py-3'>
                        <h3>Hospitality Industry SOPs</h3>
                        <div className='d-flex gap-2 pt-3 align-items-center mb-4'>
                            <div className='rating-star'>
                                <BsFillStarFill />
                                4.7
                            </div>
                            <div className='category-desc'>Best Selling Category</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-center gap-2'><a>Go to course</a> <BsArrowRight />    </div>
                    </div>
                </div>
                  <div className='skills-card'>
                    <div className='skills-bg'>
                        <img src='/man.png' alt='man pic' className='man-img' />
                        <img src='/reception1.png' alt='reception pic' className='reception-img' />
                    </div>
                    <div className='skills-content px-4 py-3'>
                        <h3>Hospitality Industry SOPs</h3>
                        <div className='d-flex gap-2 pt-3 align-items-center mb-4'>
                            <div className='rating-star'>
                                <BsFillStarFill />
                                4.7
                            </div>
                            <div className='category-desc'>Best Selling Category</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-center gap-2'><a>Go to course</a> <BsArrowRight />    </div>
                    </div>
                </div>
                  <div className='skills-card'>
                    <div className='skills-bg'>
                        <img src='/man.png' alt='man pic' className='man-img' />
                        <img src='/reception2.png' alt='reception pic' className='reception-img' />
                    </div>
                    <div className='skills-content px-4 py-3'>
                        <h3>Hospitality Industry SOPs</h3>
                        <div className='d-flex gap-2 pt-3 align-items-center mb-4'>
                            <div className='rating-star'>
                                <BsFillStarFill />
                                4.7
                            </div>
                            <div className='category-desc'>Best Selling Category</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-center gap-2'><a>Go to course</a> <BsArrowRight />    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}