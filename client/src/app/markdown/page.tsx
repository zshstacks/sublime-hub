"use client";
import { AuthWrapper } from "@/features/auth";
import { MarkdownView } from "@/features/markdown";

export default function Page() {
  return (
    <AuthWrapper>
      <MarkdownView />
    </AuthWrapper>
  );
}
