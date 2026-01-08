"use client";

import Link from "next/link";
import { useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/authSlice/asyncActions";
import { clearAuthErrors } from "@/redux/authSlice/authSlice";
import { FiMail, FiLock, FiGlobe, FiChrome } from "react-icons/fi";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
    dispatch(clearAuthErrors());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    const userData = { email, password };
    const result = await dispatch(loginUser(userData));

    if (result.type === "auth/loginUser/fulfilled") {
      router.push("/hub");
      setIsFormSubmitting(false);
    } else {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-[#38CA6B]/10 rounded-2xl border border-[#38CA6B]/20">
              <FiGlobe className="text-[#38CA6B]" size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-white/40 text-sm mt-2 font-medium">
            Login to your SublimeHub account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="name@company.com"
                required
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 focus:ring-1 focus:ring-[#38CA6B]/10 transition-all placeholder:text-white/10 shadow-inner"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                Password
              </label>
              <Link
                href="/restore"
                className="text-[10px] font-bold uppercase tracking-tighter text-[#38CA6B] hover:text-[#2fb15d] transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange}
                required
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 focus:ring-1 focus:ring-[#38CA6B]/10 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Error Message */}
          {auth.error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl py-3 px-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <p className="text-xs font-bold text-rose-500 uppercase tracking-tighter">
                Invalid email or password
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isFormSubmitting}
              className="w-full bg-[#38CA6B] hover:bg-[#2fb15d] text-white font-bold py-3.5 rounded-2xl transition-all cursor-pointer shadow-lg shadow-[#38CA6B]/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFormSubmitting ? "Processing..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={() =>
                (window.location.href = "http://localhost:8000/auth/google")
              }
              className="w-full bg-white/5 border border-white/5 hover:bg-white/10 text-white/60 hover:text-white font-bold py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <FiChrome size={18} className="text-[#38CA6B]" />
              <span>Login with Google</span>
            </button>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-white/20 font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#38CA6B] font-bold hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
