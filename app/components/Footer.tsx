import Link from "next/link"
import { useEffect, useState } from "react"

export function Footer(){
   const [date, setDate] = useState(0);
  useEffect(()=>{
      setDate(new Date().getFullYear())
  },[])
    return  <footer className="bg-transparent border-t text-gray-500 px-6 py-10 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <div className="text-orange-500 text-xl font-semibold">
                Skill<span className="text-sky-600">Hub</span>
             </div>
          <p className="text-sm ">
            Empowering learners worldwide with top-notch online courses and expert-led content.
          </p>
        </div>
    
        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/courses" className="hover:underline">Courses</Link></li>
            <li><Link href="/purcheses" className="hover:underline">About Us</Link></li>
            <li><Link href="/pages/Footer" className="hover:underline">ContactUs</Link></li>
          </ul>
        </div>
    
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 ">Stay Updated</h3>
          <p className="text-sm  mb-4">Subscribe to our newsletter to get the latest updates.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l bg-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-sm font-medium text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    
      {/* Bottom Footer */}
      <div className="mt-10 border-t pt-6 text-sm text-center text-gray-500">
        © {date} EduPlatform. All rights reserved.
      </div>
    </footer>
      
}