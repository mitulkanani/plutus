"use client";
import Login from "@/components/LoginWithFirebase/Login";
import Spinner from "@/components/Spinner/Spinner";
import { useUser } from "@/context/useContext";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { user } = useUser();
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  return (
    <div>
      {user ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner color="#1c1c21" textColor="#fff" />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default page;
