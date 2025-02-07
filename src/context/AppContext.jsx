import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";


export const AppContext = createContext()

export const AppContextProvider =(props) =>{

 /////////////////////////////COURSES\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //courses
    const [allCourses, setAllCourses] = useState([])

    //fetch allcourses
    const fetchAllCourses =()=>{
        setAllCourses(dummyCourses)
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


    useEffect(()=>{
        fetchAllCourses()
    },[])

     /////////////////////////////EDUCATOR\\\\\\\\\\\\\\\\\\\\\\\\\\\
     const [isEducator, setIsEducator] = useState(true)

    //currency
    const currency = import.meta.env.VITE_CURRENCY

    const navigate= useNavigate()

    const value = {
        currency, allCourses, navigate, calculateRating, isEducator, setIsEducator
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}