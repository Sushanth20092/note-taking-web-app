"use client";

import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       
        <div 
          
        >
         
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all">
              Notes App
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">Capture your ideas</p>
          </div>
        </div>

        
        <div className="flex items-center gap-4">
          
          
          
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}