"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/src/hooks/useLogin";
import { useAuthStore } from "@/src/store/authStore";

export default function SignInPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const { mutate, isPending, error } = useLogin();

  const [form, setForm] = useState({
    user_email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    user_email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

 
    setValidationErrors({ user_email: "", password: "" });

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.user_email)) {
      setValidationErrors(prev => ({ ...prev, user_email: "Please enter a valid email address" }));
      return;
    }

  
    if (form.password.length < 6) {
      setValidationErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
      return;
    }

    mutate(form, {
      onSuccess: (data) => {
        login(data.access_token, form.user_email);
        router.push("/");
      },
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
        
          <div className="mb-8 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70 text-sm">Sign in to continue to your notes</p>
          </div>

         
          {error && (
            <div className="mb-6 rounded-xl bg-red-500/20 border border-red-400/30 backdrop-blur-sm px-4 py-3">
              <p className="text-white text-sm text-center font-medium">
                Invalid email or password
              </p>
            </div>
          )}

     
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-white/90">Email Address</label>
              <input
                type="email"
                value={form.user_email}
                onChange={(e) => {
                  setForm({ ...form, user_email: e.target.value });
                  setValidationErrors(prev => ({ ...prev, user_email: "" }));
                }}
                className={`w-full bg-white/20 backdrop-blur-sm border ${validationErrors.user_email ? 'border-red-400' : 'border-white/30'} rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200`}
                placeholder="you@example.com"
                required
              />
              {validationErrors.user_email && (
                <p className="mt-1 text-sm text-red-200">{validationErrors.user_email}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-white/90">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setValidationErrors(prev => ({ ...prev, password: "" }));
                  }}
                  className={`w-full bg-white/20 backdrop-blur-sm border ${validationErrors.password ? 'border-red-400' : 'border-white/30'} rounded-xl px-4 py-3 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-200">{validationErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

        
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

         
          <p className="text-center text-white/80 text-sm">
            Don't have an account?{" "}
            <a className="text-white font-semibold hover:underline transition-all" href="signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}