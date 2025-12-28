"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { LuKeyRound, LuSendHorizontal } from "react-icons/lu";
import { VscLock } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto p-3 bg-indigo-50 rounded-full w-fit text-[#171717]">
            {step === 1 ? (
              <LuKeyRound className="w-8 h-8" />
            ) : (
              <VscLock className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {step === 1 ? "Forgot password?" : "Reset password"}
            </CardTitle>
            <CardDescription className="text-slate-500">
              {step === 1
                ? "No worries, we'll send you reset instructions."
                : "Enter the code and your new password below."}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {step === 1 ? (
            // STEP 1: Email
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="reset-email">Email Address</FieldLabel>
                  <div className="relative">
                    <CiMail
                      className="absolute left-3 top-3  text-slate-400"
                      size={19}
                    />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                className="w-full h-11 bg-[#171717] hover:shadow-xl text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <LuSendHorizontal />
                Send Code
              </Button>
            </form>
          ) : (
            // STEP 2: OTP + New Password
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <FieldGroup>
                <div className="flex flex-col items-center my-8 space-y-6">
                  <InputOTP maxLength={6} autoFocus>
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

                <Field>
                  <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                  <Input
                    id="new-password"
                    type="password"
                    className="h-11"
                    placeholder="••••••••"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="h-11"
                    placeholder="••••••••"
                    required
                  />
                </Field>
              </FieldGroup>

              <Button className="w-full h-11 bg-[#171717] hover:shadow-xl text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
                <FaCheck />
                Update Password
              </Button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                Wrong email? Go back
              </button>
            </form>
          )}

          <div className="pt-4 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm font-medium text-slate-500 transition-colors gap-2"
            >
              <FaArrowLeft size={12} />
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
