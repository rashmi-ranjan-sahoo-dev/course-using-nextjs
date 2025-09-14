/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface Video {
    title: string;
    url: string;
    duration: number;
    isPreview:boolean;
}

interface Course {
    _id: string;
    titile: string;
    description: string;
    price: number;
    imageUrl: string;
    videos: Video[];
}

export default function Courses(){

    const [courses,setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string |null>(null);
    const [purchasing, setPurchasing] = useState<string | null>(null);

    useEffect(()=>{

        const fetchCourses = async () =>{
        try {
            const res = await axios.get("api/admin/course");
                   setCourses(Array.isArray(res.data) ? res.data : res.data.courses);
        } catch(err: any){
            setError(err.response?.data?.error || "failed to fetch courses")
        } finally {
            setLoading(false);
        }
    }
    fetchCourses();
    },[])

    const handlePurchase = async (courseId: string) =>{
        try{
            setPurchasing(courseId);

            await axios.post("/api/user/purchases", {courseId});
            alert("course purchased successfully!")
        } catch (err: any){
            alert(err.response?.data?.error || "Failed to purchase course.")
        } finally {
            setPurchasing(null);
        }
    }


    if(loading) return <p className="text-center">Loading Courses .....</p>
    if(error) return <p className="text-center text-red-600">{error}</p>


    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">All Courses</h1>
                {courses.length === 0 ? (
                    <p>No courses avialable</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
                    {courses.map((course) =>(
                        <div
                        key={course._id}
                        className="border rounded-lg shadow p-4 shadow p-4 space-y-3">
                            {course.imageUrl &&(
                                <img 
                                src = {course.imageUrl}
                                alt={course.titile}
                                className="w-fullh-40 object-cover rounded"
                               />
                            )}
                            <h2 className="text-xl font-semibold">{course.titile}</h2>
                            <p className="text-gary-700">{course.description}</p>
                            <p className="font-bold">₹{course.price}</p>


                            <div className="space-y-2">
                                <h3 className="font-medium">Videos:</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {course.videos.map((v,i) =>(
                                        <li key={i}>
                                            {v.title} ({v.duration}s){" "}
                                            {v.isPreview && (<span className="text-green-600">(Preview)</span>)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                                <button
                       onClick={() => handlePurchase(course._id)}
                       disabled = {purchasing === course._id}
                       className="w-fit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                        {purchasing === course._id ? "Processing...": "Buy Course"}
                       </button>
                        </div>
                       ) )}
                     </div>
                   )}            
              </div>
    )
}