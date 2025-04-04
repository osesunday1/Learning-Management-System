import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"; // ✅ Get courseId & state
import Loading from "../../components/student/Loading";

const StudentsEnrolled = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { courseId } = useParams(); // ✅ Get courseId from URL
  const location = useLocation(); // ✅ Get course title from state
  const courseTitle = location.state?.courseTitle || "Course"; // Default title if state is missing
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch students from backend
  const fetchEnrolledStudents = async () => {
    try {
      const response = await fetch(`${apiUrl}/courses/${courseId}/students`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch students.");

      setEnrolledStudents(data.enrolledStudents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) fetchEnrolledStudents();
  }, [courseId]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <h2 className="text-xl font-semibold mb-4">Students Enrolled in {courseTitle}</h2>
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-gray-900 border-b border-gray-500 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Enrolled On</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.length > 0 ? (
              enrolledStudents.map((item, index) => (
                <tr key={index} className="border-b border-gray-500/20">
                  <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                  <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                    <img src={item.student.imageUrl || "/default-avatar.png"} alt="" className="w-9 h-9 rounded-full" />
                    <span className="truncate">{item.student.name}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">No students enrolled yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsEnrolled;