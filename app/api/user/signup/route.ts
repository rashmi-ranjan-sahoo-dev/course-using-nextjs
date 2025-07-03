import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { UserModel } from "@/app/models/User";
import bcrypt from "bcryptjs";
import z from "zod"

const schema = z.object({
  email: z.string().min(4).max(40).email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
  firstName: z.string(),
  lastName: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { msg: "Incorrect format", error: parsed.error.errors },
      { status: 400 }
    );
  }

  const { email, password, firstName, lastName } = parsed.data;

  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 5);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newAdmin = await UserModel.create({
      email:email,
      password: hashedPassword,
      firstName:firstName,
      lastName:lastName,
    });

    return NextResponse.json({ message: "You are signed up" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error during User signup:", error);
    return NextResponse.json(
      { message: "An error occurred during signup", error: error.message },
      { status: 500 }
    );
  }
}
