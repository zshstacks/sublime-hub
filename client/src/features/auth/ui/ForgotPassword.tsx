"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toast } from "sonner";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { LuKeyRound, LuSendHorizontal } from "react-icons/lu";
import { VscLock } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
      toast.error("Failed to send reset code");
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
        "new-password": "Password must be at least 8 characters long",
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

  const passwordError = validateErrors["new-password"];
  const confirmPasswordError = validateErrors["confirm-password"];

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
            <form className="space-y-6" onSubmit={handleForgotPasswordSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <div className="relative">
                    <CiMail
                      className="absolute left-3 top-3 text-slate-400"
                      size={19}
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                  {auth.error && (
                    <FieldDescription className="text-red-600">
                      {auth.error}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>
              <Button
                type="submit"
                className="w-full h-11 bg-[#171717] hover:shadow-xl text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <LuSendHorizontal /> Send Code
              </Button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleResetPasswordSubmit}>
              <FieldGroup>
                <div className="flex flex-col items-center my-8 space-y-6">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={handleOTPChange}
                    autoFocus
                  >
                    <InputOTPGroup className="gap-2">
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-10 h-12 sm:w-12 sm:h-14 text-lg border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Field>
                  <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                  <Input
                    id="new-password"
                    name="new-password"
                    type="password"
                    value={newPassword}
                    onChange={handleInputChange}
                    className="h-11"
                    placeholder="••••••••"
                    isInvalid={!!passwordError}
                    required
                  />
                  <FieldDescription
                    className={passwordError ? "text-red-600" : ""}
                  >
                    {passwordError || "Must be at least 8 characters long."}
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    className="h-11"
                    placeholder="••••••••"
                    isInvalid={!!confirmPasswordError}
                    required
                  />
                  {confirmPasswordError && (
                    <FieldDescription className="text-red-600">
                      {confirmPasswordError}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>

              <div className="space-y-4">
                {auth.error && (
                  <p className="text-sm text-red-600 text-center">
                    {auth.error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={auth.isLoading}
                  className="w-full h-11 bg-[#171717] hover:shadow-xl text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {auth.isLoading ? (
                    "Updating..."
                  ) : (
                    <>
                      <FaCheck /> Update Password
                    </>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    dispatch(clearAuthErrors());
                  }}
                  className="w-full text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  Wrong email? Go back
                </button>
              </div>
            </form>
          )}

          <div className="pt-4 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm font-medium text-slate-500 gap-2"
            >
              <FaArrowLeft size={12} /> Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
