"use client";


import Image from "next/image";
import Link from "next/link";
import { FaRegSun} from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import logo from '../../../public/assets/transparent_logo.png.png'
// import { useContext } from "react";
// import { AuthContext } from "../ContextAPI/AuthContext";
// import Auth from "../Authentication/Auth";


export default function Header(){
//const { isDark, setIsDark, isActive, setIsActive } = useContext(AuthContext); 

// function toggleIsDark() {
//     setIsDark(!isDark);
//   }

//   function toggleIsActive() {
//     setIsActive(!isActive);
//   }


   return (
    <nav
    className="h-[15hv] w-screen flex items-center justify-around border-b border-gray-400">
      {/* Logo section */}
      <div
      className="flex justify-center items-center">
        <Image
        src={logo}
        alt="SkillHub Logo"
        width={60}
        height={60}
        className="sm:h-25 sm:w-25 md:h-30 md:w-30"
         />
         <div className="text-orange-500 md:text-4xl sm:text-2xl -ml3 font-semibold">
            Skill<span className="text-sky-600">Hub</span>
         </div>
      </div>
         {/* Navigation Links */}
         <div
         className="flex items-center justify-center sm:gap-3 md: gap-6">
                 <Link href="/Home" className="md:text-3xl sm:text-xl font-mono hover:border-b transition-all duration-100 ease-in-out">
                 Home
                 </Link>
                  <Link href="/Courses" className="md:text-3xl sm:text-xl font-mono hover:border-b transition-all duration-100 ease-in-out">
                 Courses
                 </Link>
                  <Link href="/Purcheses" className="md:text-3xl sm:text-xl font-mono hover:border-b transition-all duration-100 ease-in-out">
                 Purcheses
                 </Link>
                  <Link href="/ContactUs" className="md:text-3xl sm:text-xl font-mono hover:border-b transition-all duration-100 ease-in-out">
                 Contact Us
                 </Link>
         </div>
           {/* Theme and Auth TOggole */}

           <div
           className="flex md:gap-6 gpa-2">
            <div
            // onClick={toggleIsDark}
            className="border text-sky-400 p-1 text-2xl rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              {/* {isDark ? <FaRegSun /> : <FaRegMoon />} */}
              <FaRegSun />
            </div>
             <div
        //   onClick={toggleIsActive}
                className="border text-sky-400 p-1 text-2xl rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
                 >
                  {/* {isActive ? <MdManageAccounts /> : <Auth />} */}
                   <MdManageAccounts />
        </div>
           </div>
    </nav>
   )

}