"use client";
import Picks from "@/components/Picks/Picks";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/system";
import { useUser } from "@/context/useContext";
import Login from "@/components/LoginWithFirebase/Login";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (user) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      <NextUIProvider>
        {user ? (
          <Picks />
        ) : (
          <div className="h-screen flex justify-center items-center">
            <Spinner color="#1c1c21" textColor="#fff" />
          </div>
        )}
      </NextUIProvider>
    </>
  );
}
