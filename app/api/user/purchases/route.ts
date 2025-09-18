/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PurchaseModel } from "@/app/models/Purchaes";
import { CourseModel } from "@/app/models/Course";
import { connectDB } from "@/app/lib/mongodb";

// ✅ GET all purchased courses for a user
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const purchases = await PurchaseModel.find({ userId });
    const courseIds = purchases.map((p) => p.courseId);
    const purchasedCourses = await CourseModel.find({ _id: { $in: courseIds } });

    return NextResponse.json({ purchasedCourses });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch purchased courses" },
      { status: 500 }
    );
  }
}

// ✅ POST a new purchase (buy course)
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { userId, courseId } = body;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "userId and courseId required" },
        { status: 400 }
      );
    }

    // check if already purchased
    const existing = await PurchaseModel.findOne({ userId, courseId });
    if (existing) {
      return NextResponse.json(
        { message: "Course already purchased" },
        { status: 400 }
      );
    }

    // create new purchase
    const purchase = await PurchaseModel.create({ userId, courseId });

    return NextResponse.json({ message: "Purchase successful", purchase });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create purchase" },
      { status: 500 }
    );
  }
}
