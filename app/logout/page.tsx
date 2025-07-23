"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {

    const router = useRouter();

    useEffect(() =>{
        localStorage.removeItem("token");
        alert("👋 You have been logged out.")

        router.push("/")
    },[router])


  return (
    <div className="border w-fit rounded absolute sm:right-0 md:right-20 top-17 shadow-md z-50"> 
      <div className="border-b font-mono hover:bg-red-400 p-2 transition-all delay-100 duration-200 cursor-pointer">
        <button>LOGOUT</button>
      </div>
    </div>
  );
}