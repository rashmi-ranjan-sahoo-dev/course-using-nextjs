/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseModel } from "@/app/models/Course";
import { PurchaseModel } from "@/app/models/Purchaes";
import { NextRequest, NextResponse } from "next/server";


export default async function GET(req: NextRequest){
    const userId = req.headers;

    try{
        const courses = await PurchaseModel.find({ userId})

        const purchasesCourseIds = [];

        for( let i = 0 ;i < courses.length; i++){
            purchasesCourseIds.push(courses[i].courseId);
        }

        const courseData = await CourseModel.find({ _id: { $in: purchasesCourseIds }})

        return NextResponse.json(
            {
                courses,
                courseData
            }
        )
    } catch(error: any){
        console.error(error);
        return NextResponse.json({ message: "Courses not found"})
    }

}