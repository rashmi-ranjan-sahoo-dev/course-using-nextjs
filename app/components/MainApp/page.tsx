// app/MainApp.tsx or inside layout.tsx
"use client";

import {  useAuth } from "../ContextAPI/page";
import Header from "../Header/page";

export default function MainApp({ children }: { children: React.ReactNode }) {
  const { isDark } =  useAuth();

  return (
    <div className={`min-h-screen w-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Header />
      {children}
    </div>
  );
}
