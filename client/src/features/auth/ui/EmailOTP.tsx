"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MdOutlineEmail } from "react-icons/md";
import { RiLoader3Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";

const EmailOTP = () => {
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleVerify = () => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    /* Overlay */
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Modal */}
      <div
        className="w-full max-w-md bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()} // Prevents closing by clicking on the window itself
      >
        {/* Header */}
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
                Email address
              </span>
            </p>
          </div>
        </div>

        {/* OTP Input */}
        <div className="flex flex-col items-center my-8 space-y-6">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(val) => setValue(val)}
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

          <div className="h-5">
            {value.length === 6 && !isLoading && (
              <p className="text-xs font-medium text-indigo-600 animate-pulse">
                Ready to verify
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md"
            disabled={value.length !== 6 || isLoading}
            onClick={handleVerify}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <RiLoader3Line className="w-4 h-4 animate-spin" /> Verifying...
              </span>
            ) : (
              "Confirm Code"
            )}
          </Button>

          <p className="text-center text-sm text-slate-500">
            Didn't get the code?{" "}
            <button className="text-indigo-600 font-medium hover:underline">
              Resend
            </button>
          </p>
        </div>

        {/* Close/Back */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button className="flex items-center justify-center w-full text-xs text-slate-400 hover:text-slate-600 transition-colors">
            <FaArrowLeft className="w-3 h-3 mr-1" />
            Back to registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailOTP;
