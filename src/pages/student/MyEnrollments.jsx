import { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import useFetch from "../../components/customHooks/useFetch";
import usePost from "../../components/customHooks/usePost";
import { toast } from "react-toastify";

const MyEnrollments = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    // ✅ Get userData first
    const userData = localStorage.getItem("userID");

    // ✅ Fetch all courses only if userData exists
    const { data: fetchedCourses } = useFetch(userData ? `${apiUrl}/courses` : null);

    // ✅ Store all courses
    const [allCourses, setAllCourses] = useState([]);
    useEffect(() => {
        if (fetchedCourses) setAllCourses(fetchedCourses);
    }, [fetchedCourses]);

    // ✅ Fetch progress data only if userData exists
    const { data: fetchedProgress } = useFetch(userData ? `${apiUrl}/students/course-progress/${userData}` : null);

    // ✅ Store enrolled courses
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // ✅ Filter enrolled courses
    useEffect(() => {
        if (!userData || allCourses.length === 0) return;
        
        const userEnrolledCourses = allCourses.filter(course =>
            Array.isArray(course.enrolledStudents) && course.enrolledStudents.includes(userData)
        );

        setEnrolledCourses(userEnrolledCourses);
    }, [userData, allCourses]);

    // ✅ Hook for making the unregister API call
    const { postData, loading } = usePost(`${apiUrl}/students/unregister`);

    // ✅ Handle course view
    const { calculateCourseDuration, navigate } = useContext(AppContext);
    const handleViewCourse = useCallback((courseId) => {
        navigate(`/player/${courseId}`);
    }, [navigate]);

    // ✅ Handle course unregistration
    const handleUnregister = async (courseId) => {
        const confirmUnregister = window.confirm("Are you sure you want to unregister from this course?");
        if (!confirmUnregister) return;

        await postData({
            postData: { courseId },
            successMessage: "You have successfully unregistered from the course!",
            onSuccess: () => {
                setEnrolledCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
            },
            onError: (errorMessage) => {
                toast.error(errorMessage || "Unregistration failed!");
            }
        });
    };

    // ✅ Show proper loading states
    if (!userData) return <p className="mt-5 text-gray-500">Loading user data...</p>;
    if (allCourses.length === 0) return <p className="mt-5 text-gray-500">Loading courses...</p>;
    if (enrolledCourses.length === 0) return <p className="mt-5 text-gray-500">You have not enrolled in any courses yet.</p>;

    return (
        <>
          <div className="md:px-36 px-4 pt-10">
            <h1 className="text-2xl font-semibold">My Enrollments</h1>
      
            {enrolledCourses.length > 0 ? (
              <div className="mt-10">
                {/* ✅ Table for medium and above */}
                <table className="hidden md:table w-full overflow-hidden border">
                  <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                    <tr>
                      <th className="px-4 py-3 font-semibold truncate">Course</th>
                      <th className="px-4 py-3 font-semibold truncate">Duration</th>
                      <th className="px-4 py-3 font-semibold truncate">Progress</th>
                      <th className="px-4 py-3 font-semibold truncate">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {enrolledCourses.map((course) => {
                      const progress = fetchedProgress?.find(p => p.courseId === course._id) || { progressPercentage: 0 };
      
                      return (
                        <tr key={course._id} className="border-b border-gray-300">
                          <td className="px-4 py-3 flex items-center space-x-3">
                            <img
                              src={course.courseThumbnail || "/default-thumbnail.jpg"}
                              alt={course.courseTitle}
                              className="w-16 md:w-28 object-cover rounded-md"
                            />
                            <p className="mb-1">{course.courseTitle}</p>
                          </td>
                          <td className="px-4 py-3">{calculateCourseDuration(course)}</td>
                          <td className="px-4 py-3">
                            <Line
                              percent={progress.progressPercentage}
                              strokeWidth={4}
                              strokeColor={progress.progressPercentage === 100 ? "blue" : "green"}
                            />
                            <p className="text-xs mt-1">{progress.progressPercentage.toFixed(0)}% Completed</p>
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              className="px-4 py-2 text-white bg-secondary hover:bg-secondary-100 rounded"
                              onClick={() => handleViewCourse(course._id)}
                            >
                              View
                            </button>
                            <button
                              className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded"
                              onClick={() => handleUnregister(course._id)}
                              disabled={loading}
                            >
                              {loading ? "Unregistering..." : "Unregister"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
      
                {/* ✅ Cards for small screens */}
                <div className="md:hidden flex flex-col gap-6">
                  {enrolledCourses.map((course) => {
                    const progress = fetchedProgress?.find(p => p.courseId === course._id) || { progressPercentage: 0 };
      
                    return (
                      <div key={course._id} className="border p-4 rounded-lg shadow-sm">
                        <div className="flex gap-4 items-start">
                          <img
                            src={course.courseThumbnail || "/default-thumbnail.jpg"}
                            alt={course.courseTitle}
                            className="w-24 h-16 object-cover rounded-md"
                          />
                          <div className="flex flex-col">
                            <p className="font-semibold">{course.courseTitle}</p>
                            <p className="text-gray-600 text-sm mt-1">Duration: {calculateCourseDuration(course)}</p>
                            <div className="mt-2">
                              <Line
                                percent={progress.progressPercentage}
                                strokeWidth={4}
                                strokeColor={progress.progressPercentage === 100 ? "blue" : "green"}
                              />
                              <p className="text-xs mt-1">{progress.progressPercentage.toFixed(0)}% Completed</p>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button
                                className="flex-1 text-sm px-3 py-1 text-white bg-secondary hover:bg-secondary-100 rounded"
                                onClick={() => handleViewCourse(course._id)}
                              >
                                View
                              </button>
                              <button
                                className="flex-1 text-sm px-3 py-1 text-white bg-red-500 hover:bg-red-700 rounded"
                                onClick={() => handleUnregister(course._id)}
                                disabled={loading}
                              >
                                {loading ? "..." : "Unregister"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="mt-5 text-gray-500">You have not enrolled in any courses yet.</p>
            )}
          </div>
          <Footer />
        </>
      );
};

export default MyEnrollments;
