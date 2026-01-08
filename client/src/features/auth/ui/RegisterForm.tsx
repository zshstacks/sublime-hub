"use client";

import Link from "next/link";
import React, { useCallback, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/authSlice/asyncActions";
import { clearAuthErrors } from "@/redux/authSlice/authSlice";
import EmailOTP from "@/features/auth/ui/EmailOTP";
import { useRouter } from "next/navigation";
import { ValidateRegisterErrors } from "@/features/auth/types/types";
import { FiUser, FiMail, FiLock, FiGlobe, FiCheckCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validateErrors, setValidateErrors] = useState<ValidateRegisterErrors>(
    {},
  );
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setValidateErrors({});
  };

  const handleVerificationSuccess = useCallback(() => {
    setIsRegistered(false);
    clearForm();
    router.push("/login");
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateErrors[e.target.name]) {
      setValidateErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }

    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm-password":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
    dispatch(clearAuthErrors());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    if (password !== confirmPassword) {
      setValidateErrors({
        password: "Passwords do not match",
        "confirm-password": "Passwords do not match",
      });
      setIsFormSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setValidateErrors({ password: "Password must be at least 8 characters" });
      setIsFormSubmitting(false);
      return;
    }

    const userData = { email, password, username };
    const result = await dispatch(registerUser(userData));

    if (result.type === "auth/registerUser/fulfilled") {
      setIsRegistered(true);
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
            Create account
          </h1>
          <p className="text-white/40 text-sm mt-2 font-medium">
            Join the SublimeHub project ecosystem
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Display Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
              Displayed Name
            </label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
              <input
                name="username"
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="m@example.com"
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Password Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none transition-all shadow-inner",
                    validateErrors.password
                      ? "border-rose-500/50"
                      : "focus:border-[#38CA6B]/30",
                  )}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                Confirm
              </label>
              <div className="relative group">
                <FiCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
                <input
                  name="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none transition-all shadow-inner",
                    validateErrors["confirm-password"]
                      ? "border-rose-500/50"
                      : "focus:border-[#38CA6B]/30",
                  )}
                  required
                />
              </div>
            </div>
          </div>

          {/* Validation & Errors */}
          {(validateErrors.password || auth.error) && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl py-3 px-4 flex items-center gap-3 animate-in fade-in zoom-in-95">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">
                {validateErrors.password || auth.error}
              </p>
            </div>
          )}

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={isFormSubmitting}
              className="w-full bg-[#38CA6B] hover:bg-[#2fb15d] text-white font-bold py-4 rounded-2xl transition-all cursor-pointer shadow-lg shadow-[#38CA6B]/10 active:scale-[0.98] disabled:opacity-50"
            >
              {isFormSubmitting ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-xs text-white/20 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#38CA6B] font-bold hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>

      {isRegistered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md">
            <EmailOTP
              setIsRegistered={setIsRegistered}
              onSuccess={handleVerificationSuccess}
              userEmail={email}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
