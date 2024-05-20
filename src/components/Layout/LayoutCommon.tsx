"use client";
import React from "react";
import Navbar from "../Navbar/Navbar";
import { useUser } from "@/context/useContext";
import Spinner from "../Spinner/Spinner";

const LayoutCommon = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isSpinner } = useUser();
  return (
    <div>
      {isSpinner ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner color="#1c1c21" textColor="#fff" />
        </div>
      ) : (
        <div>
          <Navbar />
          {children}
        </div>
      )}
    </div>
  );
};

export default LayoutCommon;
