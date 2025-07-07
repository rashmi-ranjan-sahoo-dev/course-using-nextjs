/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

// Zod schema with role & adminCode validation
const adminSignupSchema = z
  .object({
    email: z.string().email().min(4).max(40),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    role: z.enum(["admin", "user"]),
    adminCode: z.string().optional(),
  })
  .refine((data) => {
    if (data.role === "admin") {
      return data.adminCode === process.env.NEXT_PUBLIC_ADMIN_SECRET;
    }
    return true;
  }, {
    message: "Invalid admin code",
    path: ["adminCode"],
  });

type AdminSignupData = z.infer<typeof adminSignupSchema>;

export default function AdminSignupPage() {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<AdminSignupData>({
    resolver: zodResolver(adminSignupSchema),
    defaultValues: {
      role: "user",
    },
  });

  const selectedRole = watch("role");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(data: AdminSignupData) {
    setLoading(true);
    setMessage("");

    try {
      const endpoint = data.role === "admin" ? "/api/admin/signup" : "/api/user/signup";
      const res = await axios.post(endpoint, data);
      setMessage(res.data.message || "✅ Signed up successfully!");
      alert("✅ Signed up successfully!")
    } catch (error: any) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        console.error("Unexpected error:", error);
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 border rounded-xl max-w-md w-full shadow-md space-y-4 bg-transparent"
      >
        <h1 className="text-3xl font-bold text-center text-sky-600">Signup</h1>

        <select
          {...register("role")}
          className="w-full p-2 border rounded"
          defaultValue="user"
          suppressHydrationWarning
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          suppressHydrationWarning
          type="text"
          placeholder="First Name"
          {...register("firstName")}
          className="w-full p-2 border rounded"
        />

        <input
          suppressHydrationWarning
          type="text"
          placeholder="Last Name"
          {...register("lastName")}
          className="w-full p-2 border rounded"
        />

        <input
          suppressHydrationWarning
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-2 border rounded"
        />

        <input
          suppressHydrationWarning
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-2 border rounded"
        />

        {selectedRole === "admin" && (
          <input
            type="password"
            placeholder="Admin Secret Code"
            {...register("adminCode")}
            className="w-full p-2 border rounded"
            suppressHydrationWarning
          />
        )}

        <button
          suppressHydrationWarning
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded cursor-pointer"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {message && (
          <p className="text-center text-sm mt-2 text-blue-600">{message}</p>
        )}
      </form>
    </div>
  );
}
