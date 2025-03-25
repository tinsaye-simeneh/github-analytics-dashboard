"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/home");
  }, [router]);

  return <></>;
};

export default Page;
