"use client";

import { useRouter } from "next/navigation";
import Onboarding from "@/components/Onboarding";

const ONBOARDING_KEY = "bd_has_onboarded";

export default function Page() {
  const router = useRouter();

  const finishOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    router.push("/");
  };

  return <Onboarding onFinish={finishOnboarding} />;
}