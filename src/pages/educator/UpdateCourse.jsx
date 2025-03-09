import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";

const UpdateCourse = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { state } = useLocation();
  const [course, setCourse] = useState(state?.course || {});
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!state?.course) {
      // Fetch course data if not passed via state
      axios.get(`${apiUrl}/educators/courses/${courseId}`)
        .then((response) => setCourse(response.data.course))
        .catch((error) => console.error("Error fetching course:", error));
    }
  }, [courseId, state?.course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("courseData", JSON.stringify(course));
    if (image) {
      formData.append("image", image);
    }
  
    // ✅ Debug: Log FormData before sending
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Check if courseData & image are properly added
    }
  
    try {
      const response = await axios.patch(`${apiUrl}/educators/${courseId}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      console.log("✅ Response:", response.data);
      alert("Course updated successfully!");
      navigate("/educator/my-courses");
    } catch (error) {
      console.error("❌ Error updating course:", error.response?.data || error);
      alert(`Failed to update course: ${error.response?.data?.message || "Server error"}`);
    }
  };

  return (
    <>
    <h2 className="mx-8 text-lg font-medium">Update Course</h2>
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full text-gray-500">
        <div>
          <label>Course Title</label>
          <input
            type="text"
            value={course.courseTitle || ""}
            onChange={(e) => setCourse({ ...course, courseTitle: e.target.value })}
            className="outline-none py-2 px-3 rounded border border-gray-500 w-full"
            required
          />
        </div>
        <div>
          <label>Course Description</label>
          <textarea
            value={course.courseDescription || ""}
            onChange={(e) => setCourse({ ...course, courseDescription: e.target.value })}
            className="outline-none py-2 px-3 rounded border border-gray-500 w-full"
            required
          />
        </div>


        <div className='flex items-center justify-between flex-wrap'>
            <div className='flex flex-col gap-1'>
              <label>Course Price</label>
              <input
                type="number"
                value={course.coursePrice || 0}
                onChange={(e) => setCourse({ ...course, coursePrice: Number(e.target.value) })}
                className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
                required
              />
              </div>
        
            <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3 cursor-pointer'>
      
              <input type="file" 
              id="thumbnailImage"  
              onChange={(e) => setImage(e.target.files[0])} 
              accept="image/*" 
              hidden 
              />
              {course.courseThumbnail && <img src={course.courseThumbnail} alt="Thumbnail" className="w-20 mt-2" />}
            </label>
            </div>
        </div>

        <div className='flex flex-col gap-1'>
            <p>Discount %</p>
            <input 
              type="number" 
              value={course.discount} 
              onChange={(e) => setCourse({ ...course, discount: e.target.value })} 
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500" 
              min={0} 
              required 
             />
        </div>
 {/* ===========================  Adding Chapters & Lectures  ============================== */}


 <div className="mt-4">
  <h3 className="text-lg font-semibold">Course Content</h3>

  {course.courseContent && course.courseContent.length > 0 ? (
    course.courseContent.map((chapter, chapterIndex) => (
      <div key={chapterIndex} className="bg-white border rounded-lg mb-4 p-4">
        {/* ✅ Chapter Title Input */}
        <div className="flex justify-between items-center mb-2">
          <input
            type="text"
            value={chapter.chapterTitle}
            onChange={(e) => {
              const updatedChapters = [...course.courseContent];
              updatedChapters[chapterIndex].chapterTitle = e.target.value;
              setCourse({ ...course, courseContent: updatedChapters });
            }}
            className="border border-gray-400 px-2 py-1 rounded w-full"
            placeholder="Chapter Title"
          />
          <button
            className="ml-2 text-red-500 cursor-pointer"
            onClick={() => {
              const updatedChapters = course.courseContent.filter((_, index) => index !== chapterIndex);
              setCourse({ ...course, courseContent: updatedChapters });
            }}
          >
            ❌
          </button>
        </div>

        {/* ✅ Lectures in the Chapter */}
        {chapter.chapterContent && chapter.chapterContent.length > 0 ? (
          chapter.chapterContent.map((lecture, lectureIndex) => (
            <div key={lectureIndex} className="bg-gray-100 p-3 rounded mb-2">
              <input
                type="text"
                value={lecture.lectureTitle}
                onChange={(e) => {
                  const updatedChapters = [...course.courseContent];
                  updatedChapters[chapterIndex].chapterContent[lectureIndex].lectureTitle = e.target.value;
                  setCourse({ ...course, courseContent: updatedChapters });
                }}
                className="border border-gray-400 px-2 py-1 rounded w-full"
                placeholder="Lecture Title"
              />

              <input
                type="number"
                value={lecture.lectureDuration}
                onChange={(e) => {
                  const updatedChapters = [...course.courseContent];
                  updatedChapters[chapterIndex].chapterContent[lectureIndex].lectureDuration = Number(e.target.value);
                  setCourse({ ...course, courseContent: updatedChapters });
                }}
                className="border border-gray-400 px-2 py-1 rounded w-full mt-1"
                placeholder="Lecture Duration (mins)"
              />

              <input
                type="text"
                value={lecture.lectureUrl}
                onChange={(e) => {
                  const updatedChapters = [...course.courseContent];
                  updatedChapters[chapterIndex].chapterContent[lectureIndex].lectureUrl = e.target.value;
                  setCourse({ ...course, courseContent: updatedChapters });
                }}
                className="border border-gray-400 px-2 py-1 rounded w-full mt-1"
                placeholder="Lecture URL"
              />

              <label className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  checked={lecture.isPreviewFree}
                  onChange={(e) => {
                    const updatedChapters = [...course.courseContent];
                    updatedChapters[chapterIndex].chapterContent[lectureIndex].isPreviewFree = e.target.checked;
                    setCourse({ ...course, courseContent: updatedChapters });
                  }}
                />
                <span>Free Preview</span>
              </label>

              {/* Remove Lecture Button */}
              <button
                className="text-red-500 mt-2 cursor-pointer"
                onClick={() => {
                  const updatedChapters = [...course.courseContent];
                  updatedChapters[chapterIndex].chapterContent = updatedChapters[chapterIndex].chapterContent.filter(
                    (_, index) => index !== lectureIndex
                  );
                  setCourse({ ...course, courseContent: updatedChapters });
                }}
              >
                Remove Lecture ❌
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No lectures added yet.</p>
        )}

        {/* Add Lecture Button */}
        <button
          className="text-blue-500 mt-2 cursor-pointer"
          onClick={() => {
            const updatedChapters = [...course.courseContent];
            updatedChapters[chapterIndex].chapterContent.push({
              lectureTitle: "",
              lectureDuration: 0,
              lectureUrl: "",
              isPreviewFree: false,
            });
            setCourse({ ...course, courseContent: updatedChapters });
          }}
        >
          ➕ Add Lecture
        </button>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No chapters added yet.</p>
  )}

  {/* Add Chapter Button */}
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
    onClick={() => {
      const newChapter = {
        chapterTitle: "",
        chapterContent: [],
      };
      setCourse({ ...course, courseContent: [...(course.courseContent || []), newChapter] });
    }}
  >
    ➕ Add Chapter
  </button>
</div>


        


{/*                    end of  chapters and lectures                        */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Course
        </button>
      </form>


    </div>
    </>
  );
};

export default UpdateCourse;