/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { PurchaseModel } from "@/app/models/Purchaes";

export async function  GET(
     req: NextRequest,
    { params }: {params: { userId: string}}
) {
    try{
        await connectDB();

        const purchases = await PurchaseModel.find({uuserId: params.userId}).populate("courseId").lean();

        return NextResponse.json({ purchases })
    } catch (err: any){
        return NextResponse.json({ error: err.message},{status: 500})
    }
}