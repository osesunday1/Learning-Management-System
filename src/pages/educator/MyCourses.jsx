import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import useFetch from "../../components/customHooks/useFetch";
import Loading from "../../components/student/Loading";
import axios from "axios";

const MyCourses = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`${apiUrl}/educators/courses`);
  const [courses, setCourses] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ✅ Update `courses` when data is fetched
  useEffect(() => {
    if (data) {
      setCourses(data);
    }
  }, [data]);

  // ✅ Handle Delete Click
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setDeletePopup(true); // Show popup
  };

  // ✅ Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!selectedCourse) return;
    try {
      await axios.delete(`${apiUrl}/educators/${selectedCourse._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // ✅ Remove course from UI
      setCourses(courses.filter((c) => c._id !== selectedCourse._id));
      setDeletePopup(false);
      setSelectedCourse(null);
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 mt-5">Error: {error}</p>;

  return (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>

        {courses.length > 0 ? (
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">All Courses</th>
                <th className="px-4 py-3 font-semibold truncate">Earnings</th>
                <th className="px-4 py-3 font-semibold truncate">Students</th>
                <th className="px-4 py-3 font-semibold truncate">Published On</th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img src={course.courseThumbnail} alt="Course Image" className="w-16" />
                    <span className="truncate hidden md:block">{course.courseTitle}</span>
                  </td>
                  <td className="px-4 py-3">
                    ${Math.floor(course.enrolledStudents.length * course.coursePrice - course.discount * course.coursePrice / 100)}
                  </td>
                  <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 flex space-x-3">
                    <CiEdit 
                      style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
                      onClick={() => navigate(`/educator/update-course/${course._id}`, { state: { course } })}
                    />
                    <MdDelete 
                      style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                      onClick={() => handleDeleteClick(course)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 mt-5">You haven't created any courses yet.</p>
        )}
      </div>

      {/* ✅ Delete Confirmation Popup */}
      {deletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this course?</h2>
            <p className="text-gray-500 mb-4">{selectedCourse?.courseTitle}</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;