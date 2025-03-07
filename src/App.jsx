import React from 'react'
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
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/student/Navbar'
import Auth from './pages/auth/Auth'
import { Navigate, Outlet } from "react-router-dom";
import Unauthorized from './components/auth/Unauthorized'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify';
import UpdateCourse from './pages/educator/UpdateCourse'






export const App = () => {

  const isEducatorRoute= useMatch('/educator/*')


  return (
    <div className='text-default min-h-screen bg-white'>

     <ToastContainer/> 
      { !isEducatorRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/auth' element={ <Auth />} />
        <Route path='/course-list' element={ <CoursesList />} />

        {
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path='/my-enrollments' element={ <MyEnrollments />} />
        </Route>}
       
        <Route path='/course-list/:input' element={ <CoursesList />} />
        <Route path='/course/:id' element={ <CourseDetails />} />
        <Route path='/player/:courseId' element={ <Player />} />
        <Route path='/loading/:path' element={ <Loading />} />

        <Route path='/educator' element={ <Educator /> }>
            <Route index element={<Dashboard />} />
            <Route path='add-course' element={ <AddCourse/>}/>
            <Route path='my-courses' element={ <MyCourses/>}/>
            <Route path='student-enrolled/:courseId' element={ <StudentsEnrolled/>}/>

            <Route path="/educator/update-course/:courseId" element={<UpdateCourse />} />
        </Route>

        <Route path='/unauthorized' element={<Unauthorized/>} />
      </Routes>

    </div>
  )
}

export default App
