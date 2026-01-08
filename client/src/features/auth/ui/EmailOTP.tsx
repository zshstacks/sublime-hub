"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLoader3Line } from "react-icons/ri";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { resendOtp, verifyEmail } from "@/redux/authSlice/asyncActions";
import { clearAuthErrors } from "@/redux/authSlice/authSlice";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface EmailOTPProps {
  setIsRegistered: (b: boolean) => void;
  onSuccess: () => void;
  userEmail: string;
}

const EmailOTP: React.FC<EmailOTPProps> = ({
  setIsRegistered,
  onSuccess,
  userEmail,
}) => {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(60);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (val: string) => {
    setValue(val);
    dispatch(clearAuthErrors());
  };

  const handleVerify = async () => {
    const result = await dispatch(
      verifyEmail({ email: userEmail, code: value }),
    );
    if (result.type === "auth/verifyEmail/fulfilled") {
      toast.success("Identity verified successfully! 🎉");
      successTimeoutRef.current = setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      toast.error(auth.error || "Verification failed");
    }
  };

  const resendConfirmationCode = async () => {
    const result = await dispatch(resendOtp(userEmail));
    if (result.type === "auth/resendOtp/fulfilled") {
      toast.info("A new code has been dispatched.");
      setTimer(60);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#07141b]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#14202D]/90 border border-white/5 p-8 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(56,202,107,0.15)] animate-in zoom-in-95 duration-300">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="p-4 bg-[#38CA6B]/10 rounded-2xl border border-[#38CA6B]/20 text-[#38CA6B]">
              <MdOutlineEmail size={32} />
            </div>
            <div className="absolute -right-1 -bottom-1 bg-[#38CA6B] p-1 rounded-full border-2 border-[#14202D]">
              <FiShield className="text-[#14202D]" size={10} />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Verify Identity
            </h1>
            <p className="text-xs font-medium text-white/30 uppercase tracking-widest leading-relaxed">
              We've dispatched a code to <br />
              <span className="text-white/60 font-mono lowercase tracking-normal">
                {userEmail}
              </span>
            </p>
          </div>
        </div>

        {/* OTP Input Section */}
        <div className="flex flex-col items-center my-10">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={handleInputChange}
            autoFocus
          >
            <InputOTPGroup className="gap-3">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-12 h-14 text-xl font-mono font-bold border-white/5 bg-white/5 rounded-xl focus:ring-2 focus:ring-[#38CA6B]/30 text-white transition-all shadow-inner"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Action Section */}
        <div className="space-y-4">
          <button
            onClick={handleVerify}
            className="w-full h-14 bg-[#38CA6B] hover:bg-[#2fb15d] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#38CA6B]/10 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={value.length !== 6 || auth.isLoading}
          >
            {auth.isLoading ? (
              <span className="flex items-center gap-2">
                <RiLoader3Line className="w-5 h-5 animate-spin" /> VERIFYING...
              </span>
            ) : (
              "CONFIRM IDENTITY"
            )}
          </button>

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
              Didn't receive code?{" "}
              <button
                disabled={timer > 0 || auth.isLoading}
                onClick={resendConfirmationCode}
                className="text-[#38CA6B] hover:text-[#2fb15d] transition-colors disabled:opacity-30 disabled:no-underline cursor-pointer ml-1"
              >
                {timer > 0 ? `Retry in ${timer}s` : "Resend Now"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <button
            onClick={() => setIsRegistered(false)}
            className="flex items-center justify-center w-full text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-all cursor-pointer group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Abort & Back to Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailOTP;
