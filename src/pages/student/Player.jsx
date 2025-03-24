import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from '../../context/AppContext';
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import useFetch from "../../components/customHooks/useFetch";
import ReactPlayer from "react-player";



const Player = () => {

  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData]= useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { data } = useFetch(`${apiUrl}/courses/${courseId}`); // Fetch course

/** 
  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };
  */

  useEffect(() => {
    if (data) { // ✅ Only update when data is available
      setCourseData(data);
    }
  }, [data]); 

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* left column */}
          <div className="text-gray-800">

            <h2 className='text-xl font-semibold'>Course Structure</h2>

            <div className='pt-5'>
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=> toggleSection(index)}>
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

                <div className= {`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>

                            {/* ✅ Show "Watch" button if it's a video */}
                            {lecture.lectureUrl && (
                              <p onClick={() => setPlayerData({
                                ...lecture, chapter: index + 1, lecture: i + 1
                              })} className='text-blue-500 cursor-pointer'>Watch</p>
                            )}

                            {/* ✅ Show "Download" button if it's a document */}
                            {lecture.lectureFile && lecture.lectureFile.url && (
                              <a 
                              href={`${lecture.lectureFile.url}?fl_attachment=true`} 
                              download={lecture.lectureFile.filename} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className='text-green-500 cursor-pointer'>
                              Download PDF
                            </a>
                            )}

                            {/* Show lecture duration */}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                              units: ["h", "m"],
                            })}</p>

                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>

          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this Course:</h1>
            <Rating initialRating={0}/>
          </div>
        </div>

        {/* right column */}
        <div>
        {playerData ? (
            <div className="bg-secondary min-h-[300px] rounded-lg shadow-lg p-2">
              {playerData.lectureUrl ? (
                // ✅ Video Player
                <div className="relative overflow-hidden rounded-lg aspect-video">
                  <ReactPlayer url={playerData.lectureUrl} controls width="100%" height="100%" />
                </div>
              ) : (
                // ✅ Show Document
                <div className="p-4 bg-white rounded-lg shadow-md text-center">
                  <p className="text-gray-800 font-medium">
                    {playerData.chapter}.{playerData.lecture} — {playerData.lectureTitle}
                  </p>
                  <a href={playerData.lectureFile.url} target="_blank" rel="noopener noreferrer"
                    className="text-blue-500 cursor-pointer text-lg font-semibold">
                    Open Document
                  </a>
                </div>
              )}

              {/* Video / Document Info Section */}
              <div className="flex direction-column justify-between items-center mt-4 p-3 bg-white rounded-lg shadow-md">
                <p className="text-gray-800 font-medium">
                  {playerData.chapter}.{playerData.lecture} — {playerData.lectureTitle}
                </p>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-md shadow-md hover:bg-secondary-100 cursor-pointer transition-all">
                  {false ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ''} alt="" />
          )}

        </div>

      </div>

      <Footer/>
    </>
  );
};

export default Player;