import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import { AdminModel } from "@/app/models/Admin";

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
    const newAdmin = await AdminModel.create({
      email:email,
      password: hashedPassword,
      firstName:firstName,
      lastName:lastName,
    });

    return NextResponse.json({ message: "You are signed up" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
  console.error("Error during admin signup:", err);

  // Duplicate email error
  if (err.code === 11000 && err.keyValue?.email) {
    return new Response(
      JSON.stringify({ error: `Email already exists: ${err.keyValue.email}` }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }, // ✅ Add this
      }
    );
  }

  // Generic internal server error
  return new Response(
    JSON.stringify({ error: "Internal server error" }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" }, // ✅ Add this
    }
  );
}
}
