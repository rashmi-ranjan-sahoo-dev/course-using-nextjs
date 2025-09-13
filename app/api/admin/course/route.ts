/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { CourseModel } from "@/app/models/Course";
import { connectDB } from "@/app/lib/mongodb";

// Create a course
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { title, description, imageUrl, price, videos } = await req.json();

    if (!title || !description || price === undefined || !imageUrl) {
  return NextResponse.json(
    { error: "Missing required fields" },
    { status: 400 }
  );
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
      videos: validVideos,
    });

    return NextResponse.json({
      message: "Course created",
      courseId: course._id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Update a course
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const { title, description, price, imageUrl, courseId, videos } =
      await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = { title, description, price, imageUrl };

    if (Array.isArray(videos)) {
      updateData.videos = videos.map((video) => ({
        title: video.title || "",
        url: video.url || "",
        duration: video.duration || 0,
        isPreview: video.isPreview || false,
      }));
    }

    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      updateData,
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Course updated",
      course: updatedCourse,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Get all courses
export async function GET() {
  try {
    await connectDB();
    const courses = await CourseModel.find({});
    return NextResponse.json({ courses });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a course
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const deleteResult = await CourseModel.deleteOne({ _id: courseId });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const courses = await CourseModel.find({});

    return NextResponse.json({
      message: "Course deleted successfully",
      courses,
    });
  } catch (error: any) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
