import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Rating({ value }) {
    return (
        <div className="d-flex align-items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                if (value >= star) {
                    return <FaStar key={star} className="text-warning" />;
                } else if (value >= star - 0.5) {
                    return <FaStarHalfAlt key={star} className="text-warning" />;
                } else {
                    return <FaRegStar key={star} className="text-warning" />;
                }
            })}
        </div>
    );
}

export default Rating;
