import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/app/lib/verifyAdmin";
import { CourseModel } from "@/app/models/Course";
import { connectDB } from "@/app/lib/mongodb";


export async function POST(req: NextRequest) {
  try {
    const adminId = verifyAdmin(req.headers);
    const { title, description, imageUrl, price, videos } = await req.json();

    if (!title || !description || !price || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const validVideos = Array.isArray(videos)
      ? videos.map((video) => ({
          title: video.title || "",
          url: video.url || "",
          duration: video.duration || 0,
          isPreview: video.isPreview || false,
        }))
      : [];

    const course = await CourseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
      videos: validVideos,
    });

    return NextResponse.json({ message: "Course created", courseId: course._id });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const adminId = verifyAdmin(req.headers);
    const { title, description, price, imageUrl, courseId, videos } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { title, description, price, imageUrl };

    if (Array.isArray(videos)) {
      updateData.videos = videos.map((video) => ({
        title: video.title || "",
        url: video.url || "",
        duration: video.duration || 0,
        isPreview: video.isPreview || false,
      }));
    }

    const updatedCourse = await CourseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      updateData,
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course updated", course: updatedCourse });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function GET(req: NextRequest) {

  try{
    await connectDB();
    const adminId = await verifyAdmin(req.headers);

    const courses = await CourseModel.find({ createrId: adminId });

    return NextResponse.json({ courses });
  } catch(error){
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error"},
      { status: 500}
    )
  }
  
}

export async function DELETE(req: NextRequest) {
  try{
    await connectDB();
    const adminId = await verifyAdmin(req.headers);
    const { courseId } = await req.json();

    if(!courseId){
      return NextResponse.json({ error: "Course ID is required"},
        { status: 400 })
      }
        const deleteResult = await CourseModel.deleteOne({_id: courseId, creatorId: adminId})

        if(deleteResult.deletedCount === 0){
          return NextResponse.json({ error: "Course not found or unauthorized "}, { status: 404 })
        }

        const courses = await CourseModel.find({ creatorId: adminId});

        return NextResponse.json({ message:"Course deleted successfully", courses })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: any){
          console.error("DELETE Error:", error);
         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }     
}     

