import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

    try {
      await axios.patch(`${apiUrl}/educators/${courseId}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("Course updated successfully!");
      navigate("/educator/my-courses"); // ✅ Redirect to MyCourses
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course.");
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
        <div>
          <label>Course Price</label>
          <input
            type="number"
            value={course.coursePrice || 0}
            onChange={(e) => setCourse({ ...course, coursePrice: Number(e.target.value) })}
            className="outline-none py-2 px-3 rounded border border-gray-500 w-full"
            required
          />
        </div>
        <div>
          <label>Course Thumbnail</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {course.courseThumbnail && <img src={course.courseThumbnail} alt="Thumbnail" className="w-20 mt-2" />}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Course
        </button>
      </form>
    </div>
    </>
  );
};

export default UpdateCourse;