/* eslint-disable @next/next/no-img-element */
 "use client";
 import React from "react";
 import Footer from "./contact/page";

 export default function Home(){
  return <div> 
  <div className="w-full h-full flex flex-col justify-center items-center p-10 sm:P-20">
     {/* Title */}
     <div className="text-center p-5">
       <span className="text-orange-600 text-4xl sm:text-5xl font-extrabold">SkillHub:</span>
        <span className="text-4xl sm:text-5xl font-extrabold"> The Ultimate Platform to Share Knowledge</span>
     </div>

     {/* Subtitle */}
      <div className="text-lg sm:text-xl mt-4 text-center pb-5">
        A beginner-friendly platform for mastering programming skills.
      </div>

       {/* Button */}
      <div className="mt-4">
        <button className="bg-orange-600 hover:bg-orange-500 transition-all duration-300 p-3 text-xl hover:text-2xl rounded-2xl cursor-pointer">
          Explore Courses
        </button>
      </div>

       {/* Scrolling Images */}
      <div className="overflow-hidden w-full mt-10 p-5">
        <div className="flex whitespace-nowrap animate-[scroll_20s_linear_infinite] cursor-pointer">
          <img src="/assets/img-1.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
          <img src="/assets/img-2.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
          <img src="/assets/img-3.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
          <img src="/assets/img-1.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
          <img src="/assets/img-2.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
          <img src="/assets/img-3.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
           <img src="/assets/img-1.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
          <img src="/assets/img-2.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
          <img src="/assets/img-3.jpeg" alt="" className="w-72 h-60 mx-4 rounded-xl border" />
        </div>
      </div>

         {/* Keyframes */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
     </div>
     <Footer></Footer>
  </div>
 }