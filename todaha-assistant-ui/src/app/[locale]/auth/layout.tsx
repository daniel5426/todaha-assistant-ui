"use client";
import AuthLayout from "@/components/layout/auth";

export default async function Layout({ children }: { children: any }) {
  return (
      <div >
        <AuthLayout>{children}</AuthLayout>
      </div>
  );
};