import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import { AdminModel } from "@/app/models/Admin";
import jwt from "jsonwebtoken"


const schema = z.object({
  email: z.string().min(4).max(40).email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
});

export async function POST(req: NextRequest) {
    const body = req.json();
    const parsed = schema.safeParse(body);

    if(!parsed.success){
        return NextResponse.json(
            {
            message:"Incalid input", error: parsed.error.errors
        },
    { status: 400 })
    }

    const { email, password} = parsed.data;

    try{
         await connectDB();

         const admin = await AdminModel.findOne({ email });
         
         if(!admin){
            return NextResponse.json(
                {message: "Admin not found"},
                { status: 404}
            )
         }

         const isPasswordCorrect = await bcrypt.compare(password, admin.password);

         if(!isPasswordCorrect){
            return NextResponse.json(
                {message: "Incorrect credentials "},
                {status: 403}
            )
         }

         const secret = process.env.ADMIN_SECRET;

         if (!secret) {
              throw new Error("JWT_SECRET is not defined in environment variables");
             }

          const token = jwt.sign({ id: admin._id.toString() },secret);

          return NextResponse.json({ token });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any){
        console.error("Error during admin siginin:",error);
        return NextResponse.json({
            message: "An error occurred during sign in", error: error.message
        },
    { status: 500}
)
    }
}