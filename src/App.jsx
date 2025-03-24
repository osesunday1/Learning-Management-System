import React, { useEffect, useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import Auth from './pages/auth/Auth'
import Unauthorized from './components/auth/Unauthorized'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify';
import UpdateCourse from './pages/educator/UpdateCourse'
import UserProfile from './pages/auth/UserProfile'
import useFetch from './components/customHooks/useFetch'
import Navbar from './components/Navlayouts/Navbar'
import { useUser } from './context/UserContext'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'




export const App = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const userID = localStorage.getItem("userID");
    // Fetch user only if userData exists
    const { setUserData } = useUser();
    const { data: fetchedUser } = useFetch(userID ? `${apiUrl}/users/me` : null);
      // Store user


      useEffect(() => {
        if (fetchedUser) {
          setUserData(fetchedUser);
        }
      }, [fetchedUser]);


  return (
    <div className='text-default min-h-screen bg-white'>

     <ToastContainer/> 
     <Navbar/>
     <Routes>
  
            <Route path='/' element={ <Home />} />
            <Route path='/auth' element={ <Auth />} />
            <Route path='/course-list' element={ <CoursesList />} />
            <Route path='/course-list/:input' element={ <CoursesList />} />
            <Route path='/course/:id' element={ <CourseDetails />} />
            <Route path='/loading/:path' element={ <Loading />} />
         
          {/* Student-only pages */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path='/course-list' element={ <CoursesList />} />
            <Route path='/course-list/:input' element={ <CoursesList />} />
            <Route path='/course/:id' element={ <CourseDetails />} />
            <Route path='/my-enrollments' element={ <MyEnrollments />} />
            <Route path='/player/:courseId' element={ <Player />} />
            
          </Route>
          
          {/* Educator-only pages */}
          <Route element={<ProtectedRoute allowedRoles={['educator']} />}>
                <Route path='/educator' element={ <Educator /> }>
                    <Route index element={<Dashboard />} />
                    <Route path='add-course' element={ <AddCourse/>}/>
                    <Route path='my-courses' element={ <MyCourses/>}/>
                    <Route path='student-enrolled/:courseId' element={ <StudentsEnrolled/>}/>
                    <Route path="/educator/update-course/:courseId" element={<UpdateCourse />} />
                    
                </Route>
          </Route>

          {/* 👇 Shared route between both roles */}
          <Route element={<ProtectedRoute allowedRoles={["student", "educator"]} />}>
            <Route path='/profile' element={<UserProfile />} />
          </Route>
           
          <Route path='/unauthorized' element={<Unauthorized/>} />
      </Routes>

    </div>
  )
}

export default App
