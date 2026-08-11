"use client";

import { useRouter } from "next/navigation";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    try {
      await safeFetch("/api/auth/logout");
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please connect to the internet and try again.");
        return;
      }
    }
    router.push("/login");
  };

  return <button onClick={logout}>Logout</button>;
}