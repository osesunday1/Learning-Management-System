import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Loading from '../../components/student/Loading';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';
import { toast } from 'react-toastify';
import { usePaystackPayment } from 'react-paystack';
import useFetch from '../../components/customHooks/useFetch';
import { CurrencyContext } from '../../context/CurrencyContext';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  


  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    navigate
  } = useContext(AppContext);

  const userID = localStorage.getItem("userID");
  const { data: userData } = useFetch(userID ? `${apiUrl}/users/me` : null);

  const { currency, exchangeRate } = useContext(CurrencyContext)
  //const priceInSelectedCurrency = currency === 'NGN' ? courseData.coursePrice * exchangeRate : courseData.coursePrice;

  const discountedPrice = courseData
    ? (courseData.coursePrice - courseData.discount / 100 * courseData.coursePrice).toFixed(2)
    : 0;

    // Convert to selected currency
  const finalDiscountedPrice = currency === 'NGN'
  ? (discountedPrice * exchangeRate).toFixed(2)
  : discountedPrice;

  const finalOriginalPrice = currency === 'NGN'
  ? (courseData?.coursePrice * exchangeRate).toFixed(2)
  : courseData?.coursePrice;

  const config = {
    reference: new Date().getTime().toString(),
    email: userData?.email || '',
    amount: parseFloat(finalDiscountedPrice) * 100, // Paystack expects kobo
    currency, 
    publicKey,
  };

  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (!allCourses.length) return;
  
    const findCourse = allCourses.find(course => course._id === id);
    if (!findCourse) return;
  
    setCourseData(findCourse);
  
    // If user is logged in, check if already enrolled
    if (userData?._id) {
      const enrolled = findCourse.enrolledStudents.some(enrolledId => enrolledId === userData._id);
      setIsAlreadyEnrolled(enrolled);
    }
  }, [allCourses, id, userData]);
  

  const toggleSection = (index) => {
    setOpenSection(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const onSuccess = async (reference) => {
    try {
      const res = await fetch(`${apiUrl}/students/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          reference: reference.reference,
          courseId: courseData._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Payment verified! You are now enrolled.");
        setIsAlreadyEnrolled(true);
      } else {
        toast.error(data.message || "Payment verification failed.");
      }
    } catch (error) {
      toast.error("Something went wrong verifying payment.");
    }
  };

  const onClose = () => {
    toast.info("Transaction was cancelled.");
  };

  // ✅ Now safely conditionally render UI
  if (!courseData) return <Loading />;;

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>

        {/* Left Column */}
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800 custom-heading'>
            {courseData.courseTitle}
          </h1>
          <p className='pt-4 md:text-base text-sm'
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

          {/* Ratings & Enrollments */}
          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <p>{calculateRating(courseData)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                  alt=''
                  className='w-3.5 h-3.5'
                />
              ))}
            </div>
            <p className='text-blue-600'>
              ({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})
            </p>
            <p>
              {courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'people' : 'person'} enrolled
            </p>
          </div>

          <p className='text-sm'>
            Course by <span className='text-blue-600 underline'>GreatStack</span>
          </p>

          {/* Course Structure */}
          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            <div className='pt-5'>
              {courseData?.courseContent?.length > 0 ? courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img
                        className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`}
                        src={assets.down_arrow_icon} alt="arrow icon"
                      />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>
                      {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className='flex items-start gap-2 py-1'>
                          <img src={assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() => setPlayerData({ videoId: lecture.lectureUrl.split('/').pop() })}
                                  className='text-blue-500 cursor-pointer'>
                                  Preview
                                </p>
                              )}
                              <p>
                                {lecture.lectureDuration
                                  ? humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )) : (
                <p>No chapters available</p>
              )}
            </div>
          </div>

          {/* Course Description */}
          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p className='pt-3 rich-text' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
          </div>
        </div>

        {/* Right Column */}
        <div className='z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] custom-course-card p-3'>

          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName='w-full aspect-video'
            />
          ) : (
            <img src={courseData.courseThumbnail || '/default-thumbnail.jpg'} alt="Course thumbnail" />
          )}

          <div className='p-5'>
            <div className='flex items-center gap-2'>
              <img className='w-3.5' src={assets.time_left_clock_icon} alt="time left clock icon" />
              <p className='text-red-500'> <span className='font-medium'>5 days</span> left at this price! </p>
            </div>
          </div>

          <div className='flex gap-3 items-center pt-2'>
            <p className='text-gray-800 md:text-2xl text-2xl font-semibold'>
              {currency} {Number(finalDiscountedPrice).toLocaleString()}
            </p>
            <p className="md:text-lg text-gray-500 line-through">{currency} {Number(finalOriginalPrice).toLocaleString()}</p>
            <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
          </div>

          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
            <div className='flex items-center gap-1'>
              <img src={assets.star} alt="star icon" />
              <p>{calculateRating(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500'></div>
            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt="clock icon" />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500'></div>
            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt="clock icon" />
              <p>{calculateNoOfLectures(courseData)} lessons</p>
            </div>
          </div>

          {/* Enroll / Proceed Button */}
          {isAlreadyEnrolled ? (
              <button
                onClick={() => navigate(`/player/${courseData._id}`)}
                className="md:mt-6 mt-4 w-full py-3 bg-primary hover:bg-primary-100 text-white rounded font-medium"
              >
                Proceed to Course
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!userID) {
                    // Not logged in, redirect to auth
                    toast.info("Please log in to enroll.");
                    navigate("/auth");
                    return;
                  }
                  initializePayment(onSuccess, onClose);
                }}
                className="md:mt-6 mt-4 w-full py-3 bg-secondary hover:bg-secondary-100 text-white rounded font-medium cursor-pointer"
              >
                Pay & Enroll Now
              </button>
            )}

          {/* Course Benefits */}
          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-800'>What's in the course?</p>
            <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-500'>
              <li>Lifetime access with free updates.</li>
              <li>Step-by-step, hands-on project guidance.</li>
              <li>Downloadable resources and source code.</li>
              <li>Quizzes to test your knowledge.</li>
              <li>Certificate of completion.</li>
            </ul>
          </div>

        </div>
      </div>

      <Footer />
    </>
  ) : <Loading />;
};

export default CourseDetails;