"use client";
import { useUser } from "@/context/useContext";
import { navbarData } from "@/utils/content";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const path = usePathname();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeTab");
    } else {
      return "";
    }
  });
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const toggleMenu = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const activeTabHandler = (index: any) => {
    console.log(index);
    localStorage.setItem("activeTab", index as any);
    setActiveTab(localStorage.getItem("activeTab") as any);
  };
  console.log(user);
  console.log(activeTab);
  return (
    <div
      className={`${
        !user ? "hidden" : "visible"
      } border-b border-[#7c7c7e] relative z-[9999]`}
    >
      <div className="flex justify-between px-[50px] container mx-auto h-[77px] items-center">
        <div>
          <Link
            href={"/"}
            className="font-inter text-[#e0dcbb] font-semibold text-[32px]"
          >
            Plutus
          </Link>
        </div>
        <div className="flex gap-[60px] items-center">
          <div className="flex gap-10">
            {navbarData.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  key={index}
                  onMouseEnter={() => toggleMenu(item.id)}
                  onMouseLeave={() => toggleMenu(item.id)}
                  className={`${
                    activeIndex == item.id || (activeTab as any) == item.id
                      ? "text-[#365c7c]"
                      : "text-white"
                  } font-medium duration-200 cursor-pointer text-[16px] font-inter`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
