"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, [router]);

  // ✅ Proper return statement
  return (
    <>
      {children}
    </>
  );
}

