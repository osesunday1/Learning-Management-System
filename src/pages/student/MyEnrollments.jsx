import { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import useFetch from "../../components/customHooks/useFetch";
import usePost from "../../components/customHooks/usePost";
import { toast } from "react-toastify";

const MyEnrollments = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const { enrolledCourses, setEnrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);
    const [fetchedProgress, setFetchedProgress] = useState(null);

    // ✅ Fetch progress data
    const userData = localStorage.getItem("userID");
    const { data } = useFetch(userData ? `${apiUrl}/students/course-progress/${userData}` : null);

    useEffect(() => {
        if (data) setFetchedProgress(data);
    }, [data]);

    // ✅ Hook for making the unregister API call
    const { postData, loading } = usePost(`${apiUrl}/students/unregister`);

    const handleViewCourse = useCallback((courseId) => {
        navigate(`/player/${courseId}`);
    }, [navigate]);

    // ✅ Unregister function
    const handleUnregister = async (courseId) => {
        const confirmUnregister = window.confirm("Are you sure you want to unregister from this course?");
        if (!confirmUnregister) return;

        const result = await postData({
            postData: { courseId },
            successMessage: "You have successfully unregistered from the course!",
            onSuccess: () => {
                setEnrolledCourses(prevCourses => prevCourses.filter(course => course._id !== courseId)); // ✅ Remove from UI
            },
            onError: (errorMessage) => {
                toast.error(errorMessage || "Unregistration failed!");
            }
        });
    };

    if (!userData) return <p className="mt-5 text-gray-500">Loading user data...</p>;

    if (!enrolledCourses.length) return <p className="mt-5 text-gray-500">Loading your enrolled courses...</p>;

    return (
        <>
            <div className="md:px-36 px-8 pt-10">
                <h1 className="text-2xl font-semibold">My Enrollments</h1>

                {enrolledCourses.length > 0 ? (
                    <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
                        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Course</th>
                                <th className="px-4 py-3 font-semibold truncate">Duration</th>
                                <th className="px-4 py-3 font-semibold truncate">Progress</th>
                                <th className="px-4 py-3 font-semibold truncate">Actions</th> {/* ✅ Updated column */}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {enrolledCourses.map((course) => {
                                const progress = fetchedProgress?.find(p => p.courseId === course._id) || { progressPercentage: 0 };

                                return (
                                    <tr key={course._id} className="border-b border-gray-500">
                                        <td className="md:px-4 px-2 md:pl-4 py-3 flex items-center space-x-3">
                                            <img
                                                src={course.courseThumbnail || "/default-thumbnail.jpg"}
                                                alt={course.courseTitle}
                                                className="w-14 sm:w-24 md:w-28 object-cover rounded-md"
                                            />
                                            <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                                        </td>

                                        <td className="px-4 py-3 max-sm:hidden">
                                            {calculateCourseDuration(course)}
                                        </td>

                                        {/* ✅ Progress Bar Section */}
                                        <td className="px-4 py-3">
                                            <Line
                                                percent={progress.progressPercentage}
                                                strokeWidth={4}
                                                strokeColor={progress.progressPercentage === 100 ? "blue" : "green"}
                                            />
                                            <p className="text-xs mt-1">{progress.progressPercentage.toFixed(0)}% Completed</p>
                                        </td>

                                        {/* ✅ Action Buttons (View Course & Unregister) */}
                                        <td className="px-4 py-3 max-sm:text-right flex gap-3">
                                            <button
                                                className="px-3 sm:px-5 py-1.5 sm:py-2 text-white bg-secondary hover:bg-secondary-100 cursor-pointer"
                                                onClick={() => handleViewCourse(course._id)}
                                            >
                                                View Course
                                            </button>

                                            <button
                                                className="px-3 sm:px-5 py-1.5 sm:py-2 text-white bg-red-500 hover:bg-red-700 cursor-pointer"
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
                ) : (
                    <p className="mt-5 text-gray-500">You have not enrolled in any courses yet.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default MyEnrollments;