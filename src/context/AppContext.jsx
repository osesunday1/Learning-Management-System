import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import useFetch from "../components/customHooks/useFetch";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    ///////////////////////////// USER /////////////////////////////
    const [userData, setUserData] = useState();
    
    // Fetch logged-in user
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`${apiUrl}/users/me`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();
            if (result && result.data) {
                setUserData(result.data); // ✅ Correctly updates state
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData(); // ✅ Calls async function properly
    }, []);


    // Logout
    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userID");
        navigate("/");
    };

    ///////////////////////////// COURSES /////////////////////////////
    const [allCourses, setAllCourses] = useState([]);
    const { data } = useFetch(`${apiUrl}/courses`); // Fetch all courses

    useEffect(() => {
        if (data) setAllCourses(data);
    }, [data]); // ✅ Only updates when `data` changes

    // Function to calculate average rating
    const calculateRating = (course) => {
        if (!course || !course.courseRatings || course.courseRatings.length === 0) {
            return 0;
        }
        const totalRating = course.courseRatings.reduce((acc, rating) => acc + rating.rating, 0);
        return Math.floor(totalRating / course.courseRatings.length); // ✅ Fixed `map.floor()`
    };

    // Function to calculate chapter duration
    const calculateChapterTime = (chapter) => {
        const totalTime = chapter.chapterContent.reduce((acc, lecture) => acc + lecture.lectureDuration, 0);
        return humanizeDuration(totalTime * 60 * 1000, { units: ["h", "m"] });
    };

    // Function to calculate total course duration
    const calculateCourseDuration = (course) => {
        if (!course || !course.courseContent) return 0;
        const totalTime = course.courseContent.reduce((acc, chapter) => {
            if (chapter.chapterContent) {
                return acc + chapter.chapterContent.reduce((sum, lecture) => sum + lecture.lectureDuration, 0);
            }
            return acc;
        }, 0);
        return humanizeDuration(totalTime * 60 * 1000, { units: ["h", "m"] });
    };

    // Function to calculate number of lectures in a course
    const calculateNoOfLectures = (course) => {
        if (!course || !Array.isArray(course.courseContent)) return 0; // ✅ Prevents `.reduce()` error
      
        return course.courseContent.reduce((acc, chapter) => {
          return acc + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0);
        }, 0);
      };

    ///////////////////////////// ENROLLED COURSES /////////////////////////////
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        if (!userData || !userData._id || allCourses.length === 0) return;
        
        const userEnrolledCourses = allCourses.filter(course => 
            Array.isArray(course.enrolledStudents) && course.enrolledStudents.includes(userData._id)
        );

        setEnrolledCourses(userEnrolledCourses);
    }, [userData, allCourses]);


    ////////////////////////////////EDUCATOR CREATED COURSES\\\\\\\\\\\\\\\\\\\\\
    const [createdCourses, setCreatedCourses] = useState([]);

    useEffect(() => {
        if (!userData || !userData._id || allCourses.length === 0) return;
    
        const userCreatedCourses = allCourses.filter(course => 
            course.educator === userData._id // ✅ Ensure it's a direct string comparison
        );
    
        setCreatedCourses(userCreatedCourses);
    }, [userData, allCourses]);


    ///////////////////////////// EDUCATOR /////////////////////////////
    const [isEducator, setIsEducator] = useState(true);
    const currency = import.meta.env.VITE_CURRENCY;

    const value = {
        userData,
        logoutHandler,
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateNoOfLectures,
        calculateCourseDuration,
        calculateChapterTime,
        enrolledCourses,
        createdCourses,
        setEnrolledCourses,
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};