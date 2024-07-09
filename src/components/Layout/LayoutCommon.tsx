"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useUser } from "@/context/useContext";
import Spinner from "../Spinner/Spinner";
import { usePathname } from "next/navigation";

const LayoutCommon = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isSpinner, user } = useUser();
  const path = usePathname();
  const [showSpinner, setShowSpinner] = useState(true);

  const shouldShowNavbar = path !== "/login";
  console.log(shouldShowNavbar);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showSpinner ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner color="#1c1c21" textColor="#fff" />
        </div>
      ) : (
        <div>
          {shouldShowNavbar && <Navbar />}
          {children}
        </div>
      )}
    </div>
  );
};

export default LayoutCommon;
