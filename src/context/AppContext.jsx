import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext()

export const AppContextProvider =(props) =>{


    //courses
    const [allCourses, setAllCourses] = useState([])

    //fetch allcourses
    const fetchAllCourses =()=>{
        setAllCourses(dummyCourses)
    }

    useEffect(()=>{
        fetchAllCourses()
    },[])
    

    //currency
    const currency = import.meta.env.VITE_CURRENCY

    const navigate= useNavigate()

    const value = {
        currency, allCourses, navigate
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}