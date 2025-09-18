/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from "react"
import axios from 'axios';


export default function PurchasesCourse({ params }: any){
    const {courseId} = params;
    const [course, setCourse] = useState<any>(null);

    useEffect(() => {
        async function fetchCourse() {
            const res = await axios.get(`/api/courses/${courseId}`);
            setCourse(res.data.course);
        }
        fetchCourse();
    },[courseId])

    if(!course) return <p>Loading...</p>

    return (
        <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p>{course.description}</p>
            {course.videos.map((video: any, idx: number) =>(
                <div key={idx} className="mt-4">
                    <h3>{video.title}</h3>
                    <video controls width="600" className="rounded shadow">
                        <source src={video.url} type="video/mp4"/>
                    </video>
                </div>
            ))}
        </div>
    )
}