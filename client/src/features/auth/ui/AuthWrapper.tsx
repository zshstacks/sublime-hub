"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loadUser } from "@/redux/authSlice/asyncActions";
import { SpinnerCustom } from "@/components/ui/spinner";

function AuthWrapper({ children }: { children: ReactNode }) {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isLoading && auth.user === null) {
      router.push("/login");
    }
  }, [auth.isLoading, auth.user, router]);

  if (auth.isLoading) {
    return (
      <div className=" flex font-black min-h-screen justify-center text-center bg-[#131A25]">
        <SpinnerCustom className="size-8 text-neutral-400" />
      </div>
    );
  }

  if (!auth.user) {
    return null;
  }

  return <>{children}</>;
}

export default AuthWrapper;
