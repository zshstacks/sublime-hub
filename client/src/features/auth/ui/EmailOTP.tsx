"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MdOutlineEmail } from "react-icons/md";
import { RiLoader3Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { resendOtp, verifyEmail } from "@/redux/authSlice/asyncActions";
import { clearAuthErrors } from "@/redux/authSlice/authSlice";
import { toast } from "sonner";

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
  const error = auth.error;

  const handleInputChange = (val: string) => {
    setValue(val);
    dispatch(clearAuthErrors());
  };

  const handleVerify = async () => {
    const result = await dispatch(
      verifyEmail({ email: userEmail, code: value }),
    );
    if (result.type === "auth/verifyEmail/fulfilled") {
      toast.success("Email successfully verified! 🎉");
      successTimeoutRef.current = setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      toast.error(error);
    }
  };

  const resendConfirmationCode = async () => {
    const result = await dispatch(resendOtp(userEmail));
    if (result.type === "auth/resendOtp/fulfilled") {
      toast.info("New code sent to your email.");
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-indigo-600 dark:text-indigo-400">
            <MdOutlineEmail className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Verify your email
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We've sent a code to{" "}
              <span className="font-medium text-slate-900 dark:text-slate-200">
                {userEmail}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center my-8 space-y-6">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={handleInputChange}
            autoFocus
          >
            <InputOTPGroup className="gap-2">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-lg border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleVerify}
            className="w-full h-12 bg-[#171717]  text-white transition-all shadow-md cursor-pointer"
            disabled={value.length !== 6 || auth.isLoading}
          >
            {auth.isLoading ? (
              <span className="flex items-center gap-2">
                <RiLoader3Line className="w-4 h-4 animate-spin" /> Verifying...
              </span>
            ) : (
              "Confirm Code"
            )}
          </Button>

          <p className="text-center text-sm text-slate-500">
            Didn't get the code?{" "}
            <button
              disabled={timer > 0 || auth.isLoading}
              onClick={resendConfirmationCode}
              className="text-[#171717] font-medium hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer"
            >
              {timer > 0 ? `Wait ${timer}s` : "Resend"}
            </button>
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setIsRegistered(false)}
            className="flex items-center justify-center w-full text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <FaArrowLeft className="w-3 h-3 mr-1" />
            Back to registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailOTP;
