/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PurchaseModel } from "@/app/models/Purchaes";
import { connectDB } from "@/app/lib/mongodb";


export async function POST(req: NextRequest){
    try{
        await connectDB();

        const {userId, courseId} = await req.json();


        if(!userId || !courseId){
            return NextResponse.json({error: "userId and courseId required"}, {status:400})
        }

        const alreadyBought = await PurchaseModel.findOne({userId, courseId});
        if(alreadyBought){
            return NextResponse.json({ error: "Course already purchased"}, { status: 400})
        }

        const purchase = await PurchaseModel.create({ userId, courseId});

        return NextResponse.json({ message: "Purchase successful", purchase}, {status:201})
    } catch (err: any){
        console.error(err);
        return NextResponse.json({ error: "Faildto purchase course"}, {status: 500})
    }
}