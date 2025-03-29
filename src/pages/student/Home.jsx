import Hero from "../../components/student/Hero";
import Companies from "../../components/student/Companies";
import CoursesSection from "../../components/student/CoursesSection";
import TestimonialSection from "../../components/student/TestimonialSection";
import Footer from "../../components/student/Footer";
import Auth from "../auth/Auth";



const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
     <Hero/>
     <CoursesSection/>
     <Footer/>
    </div>
  );
};

export default Home;