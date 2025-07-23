/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../ContextAPI/page";
 


// Named export
export function RegistrationMenu() {
     // @ts-ignore
    const { setIsActive ,isActive} = useContext(AuthContext);
  return (
    <div
    onClick={() => setIsActive(!isActive)}
    className="border w-fit rounded absolute sm:right-0 md:right-20 top-16 shadow-md z-50 cursor-pointer">
      <div className="border-b font-mono hover:bg-sky-400 p-2 transition-all">
        <Link href="/signup">SIGNUP</Link>
      </div>
      <div className="font-mono hover:bg-sky-400 p-2 transition-all">
        <Link href="/signin">SIGNIN</Link>
      </div>
    </div>
  );
}

export function Logout() {

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

export function AdminLogout() {
  return (
    <div className="border w-fit rounded absolute sm:right-0 md:right-20 top-17 shadow-md z-50">
      <div className="border-b font-mono hover:bg-sky-400 p-2 transition-all delay-100 duration-200">
        <Link href="/CourseManager">COURSES</Link>
      </div>
      <div className="font-mono hover:bg-red-400 p-2 transition-all delay-100 duration-200">
        <Link href="/logout">LOGOUT</Link>
      </div>
    </div>
  );
}

export function LogoutAuth() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { isAdmin } = auth;

  return <div>{isAdmin ? <AdminLogout /> : <Logout />}</div>;
}

export default function Auth() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { isActive } = auth;

  if(isActive) console.log("true");
  else console.log(false);

  return <div>{isActive ? <RegistrationMenu /> : <LogoutAuth />}</div>;
}