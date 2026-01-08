"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toast } from "sonner";
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiSend,
  FiCheck,
  FiKey,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { AppDispatch, RootState } from "@/redux/store";
import { forgotPassword, resetPassword } from "@/redux/authSlice/asyncActions";
import { clearAuthErrors } from "@/redux/authSlice/authSlice";
import { ValidateResetPasswordErrors } from "@/features/auth/types/types";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validateErrors, setValidateErrors] =
    useState<ValidateResetPasswordErrors>({});

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const clearForm = () => {
    setEmail("");
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
    setValidateErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (validateErrors[name]) {
      setValidateErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    if (name === "email") setEmail(value);
    if (name === "new-password") setNewPassword(value);
    if (name === "confirm-password") setConfirmPassword(value);
    dispatch(clearAuthErrors());
  };

  const handleOTPChange = (val: string) => {
    setCode(val);
    dispatch(clearAuthErrors());
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(result)) {
      setStep(2);
      toast.success("Reset code sent to your email");
    } else {
      toast.error(auth.error || "Failed to send reset code");
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setValidateErrors({
        "new-password": "Passwords do not match",
        "confirm-password": "Passwords do not match",
      });
      return;
    }
    if (newPassword.length < 8) {
      setValidateErrors({
        "new-password": "Password must be at least 8 characters",
      });
      return;
    }
    const result = await dispatch(
      resetPassword({ email, code, new_password: newPassword }),
    );
    if (resetPassword.fulfilled.match(result)) {
      toast.success("Password changed successfully");
      clearForm();
      router.push("/login");
    } else {
      toast.error(auth.error || "Failed to reset password");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto animate-in fade-in duration-500">
      <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-[#38CA6B]/10 rounded-2xl border border-[#38CA6B]/20">
              {step === 1 ? (
                <FiKey className="text-[#38CA6B]" size={28} />
              ) : (
                <FiLock className="text-[#38CA6B]" size={28} />
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {step === 1 ? "Forgot password?" : "Reset password"}
          </h1>
          <p className="text-white/40 text-sm mt-2 font-medium">
            {step === 1
              ? "No worries, we'll send you reset instructions."
              : "Enter the code and your new password below."}
          </p>
        </div>

        {step === 1 ? (
          /* STEP 1: Email Input */
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
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
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38CA6B]/30 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={auth.isLoading}
              className="w-full bg-[#38CA6B] hover:bg-[#2fb15d] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#38CA6B]/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {auth.isLoading ? (
                "Sending..."
              ) : (
                <>
                  <FiSend size={18} /> SEND RESET CODE
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: OTP & New Password */
          <form onSubmit={handleResetPasswordSubmit} className="space-y-5">
            <div className="flex flex-col items-center my-6">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={handleOTPChange}
                autoFocus
              >
                <InputOTPGroup className="gap-2 sm:gap-3">
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-10 h-12 sm:w-11 sm:h-14 text-lg border-white/5 bg-white/5 rounded-xl text-white focus:ring-2 focus:ring-[#38CA6B]/30 transition-all shadow-inner"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
                  <input
                    name="new-password"
                    type="password"
                    value={newPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={cn(
                      "w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none transition-all shadow-inner",
                      validateErrors["new-password"]
                        ? "border-rose-500/50"
                        : "focus:border-[#38CA6B]/30",
                    )}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <FiCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38CA6B] transition-colors" />
                  <input
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
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

            {/* Error Display */}
            {(validateErrors["new-password"] || auth.error) && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl py-3 px-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">
                  {validateErrors["new-password"] || auth.error}
                </p>
              </div>
            )}

            <div className="pt-4 space-y-4">
              <button
                type="submit"
                disabled={auth.isLoading}
                className="w-full bg-[#38CA6B] hover:bg-[#2fb15d] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#38CA6B]/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                {auth.isLoading ? (
                  "UPDATING..."
                ) : (
                  <>
                    <FiCheck size={18} /> UPDATE PASSWORD
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  dispatch(clearAuthErrors());
                }}
                className="w-full text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-[#38CA6B] transition-all cursor-pointer"
              >
                Wrong email? Go back
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-white transition-all gap-2 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            BACK TO SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
