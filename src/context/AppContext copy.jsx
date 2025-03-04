import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import humanizeDuration from "humanize-duration";
import useFetch from "../components/customHooks/useFetch";








export const AppContext = createContext()
export const AppContextProvider =(props) =>{

/////////////////backend url\\\\\\\\\\\\\\\\\\\\\
const apiUrl = import.meta.env.VITE_BACKEND_URL;


/////////////////////////////USER\\\\\\\\\\\\\\\\\\\\\\\\\\

//LOGOUT 
 const logoutHandler = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/"); // Redirect to login page after logout
};


 /////////////////////////////COURSES\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //courses
    const [allCourses, setAllCourses] = useState([])

    const { data, loading, error } = useFetch(`${apiUrl}/`); 

    //fetch allcourses
    const fetchAllCourses =()=>{
        setAllCourses(data)
    }






    //function to calculate average rating
    const calculateRating=(course)=>{
        if(course.courseRatings.length === 0){
            return 0;
        }

        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })

        return totalRating  / course.courseRatings.length
    }


    // Function to Calculate Course Chapter Time
    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    // Function to Calculate Course Duration
    const calculateCourseDuration = (course) => {
        let time = 0;
    
        course.courseContent.map((chapter) =>
        chapter.chapterContent.map(
            (lecture) => (time += lecture.lectureDuration)
        )
        );
    
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };


    // Function to calculate the number of lectures in the course
    const calculateNoOfLectures = (course) => {
            let totalLectures = 0;
        
            course.courseContent.forEach((chapter) => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
            });
        
            return totalLectures;
        };

    //////enrolled courses
    const [enrolledCourses, setEnrolledCourses] = useState([])
    //fetch user enrolled courses
    const fetchUserEnrolledCourses = () =>{
        setEnrolledCourses(dummyCourses)
    }


    useEffect(()=>{
        fetchAllCourses()
        fetchUserEnrolledCourses()
    },[])
   
     /////////////////////////////EDUCATOR\\\\\\\\\\\\\\\\\\\\\\\\\\\
     const [isEducator, setIsEducator] = useState(true)

    //currency
    const currency = import.meta.env.VITE_CURRENCY

    const navigate= useNavigate()

    const value = {
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
        setEnrolledCourses, 
        fetchUserEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}