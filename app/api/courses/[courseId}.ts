// import { NextRequest, NextResponse } from "next/server";



// export default async function POST(req: NextRequest){
    
// }


import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/app/lib/mongodb";
import { CourseModel } from "@/app/models/Course";

export default async function  handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const { courseId } = req.query;

    if(req.method == "GET"){
        try {
            const course = await CourseModel.findById(courseId);

            if(!course){
                return res.status(404).json({ errro: "Course not found"})
            }

            return res.status(200).json(course);
        } catch(err) {
            console.error("Error fetching course :",err)
            return res.status(500).json({error: "Internal server Error"})
        }
    } else {
        return res.status(405).json({ error: "Method not allowed"})
    }
}