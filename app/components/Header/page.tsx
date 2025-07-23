"use client";


import Image from "next/image";
import Link from "next/link";
import { FaRegSun,FaRegMoon} from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import logo from '../../../public/assets/transparent_logo.png.png'
import { useContext } from "react";
import { AuthContext } from "../ContextAPI/page";
import Auth from "../Auth/page";

export default function Header(){
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
const { isDark, setIsDark ,isActive, setIsActive } = useContext(AuthContext); 

function toggleIsDark() {
    setIsDark(!isDark);
  }

  function toggleIsActive() {
    setIsActive(!isActive);
  }


   return (
    <nav
    className="h-[12vh] w-screen flex items-center justify-around border-b border-gray-400">
      {/* Logo section */}
      <div
      className="flex justify-center items-center">
        <Image
        src={logo}
        alt="SkillHub Logo"
        width={50}
        height={50}
        className="sm:h-20 sm:w-20 md:h-25 md:w-25"
         />
         <div className="text-orange-500 md:text-4xl sm:text-2xl -ml-5 font-semibold">
            Skill<span className="text-sky-600">Hub</span>
         </div>
      </div>
          {/* Navigation Links */}
         <div
         className="hidden sm:flex items-center justify-center sm:gap-3 md:gap-9">
                 <Link href="/" className="md:text-2xl sm:text-xl font-mono hover:border-b transition-all duration-100 ease-in-out">
                 Home
                 </Link>
                  <Link href="/Courses" className="md:text-2xl sm:text-xl font-mono hover:border-b transition-all duration-100 ease-in-out">
                 Courses
                 </Link>
                  <Link href="/Purcheses" className="md:text-2xl sm:text-xl font-mono hover:border-b transition-all duration-100 ease-in-out">
                 Purcheses
                 </Link>
                  <Link href="/contact" className="md:text-2xl sm:text-xl font-mono hover:border-b transition-all duration-100 ease-in-out">
                 ContactUs
                 </Link>
         </div>
           {/* Theme and Auth TOggole */}

           <div
           className="flex md:gap-6 gap-6">
            <div
            onClick={toggleIsDark}
            className="border text-sky-400 p-1 text-2xl rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              {isDark ? <FaRegSun /> : <FaRegMoon />}
              {/* <FaRegSun /> */}
            </div>
            <div>
             <div
           onClick={toggleIsActive}
                className="border text-sky-400 p-1 text-2xl rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
                 >
                  <MdManageAccounts /> 
             </div>
             {isActive && <Auth/>}
             </div>
           </div>
    </nav>
   )

}