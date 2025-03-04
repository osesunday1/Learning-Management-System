import { assets } from "../../assets/assets"
import SearchBar from "./SearchBar"

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-primary'>

      <h1 className='md:text-home-heading-large custom-heading text-home-heading-small relative font-bold  max-w-3xl mx-auto'>
      Strengthening Relationships, One Lesson at a Time
        <span className='text-primary-100'> Start Your Journey Together.</span>
        <img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0' />
      </h1>


      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
      Empower your relationship with expert-guided counseling courses for couples, students, and tutors.
      </p>

      <p className="md:hidden text-[#ed3849] max-w-sm mx-auto"> Empower your relationship with expert-guided counseling courses for couples. </p>

      <SearchBar/>
    </div>
  )
}

export default Hero