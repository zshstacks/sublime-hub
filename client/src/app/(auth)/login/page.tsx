import { LoginForm } from "@/features/auth";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
