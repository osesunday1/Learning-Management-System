import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { CurrencyContext } from "../../context/CurrencyContext"; // ✅ Import currency context
import { Link } from "react-router-dom";
import humanizeDuration from "humanize-duration";

const CourseCard = ({ course }) => {
  const { calculateRating } = useContext(AppContext);
  const { currency, exchangeRate } = useContext(CurrencyContext); // ✅ Destructure currency and rate

  // Calculate discounted price in USD first
  const usdDiscountedPrice = course.coursePrice - (course.discount * course.coursePrice / 100);

  // Convert if currency is NGN
  const finalPrice = currency === "NGN"
    ? (usdDiscountedPrice * exchangeRate).toFixed(2)
    : usdDiscountedPrice.toFixed(2);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="group pb-6 overflow-hidden rounded-lg hover:bg-secondary hover:text-white shadow-md"
    >
      <img className="w-full h-48 object-cover" src={course.courseThumbnail} alt="" />
      <div className="p-3 text-left ">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500 group-hover:text-white">
          {course.educator?.name || "Unknown Educator"}
        </p>
        <div className="flex items-center space-x-2">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                alt=""
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-800 group-hover:text-white">
          {currency} {Number(finalPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;