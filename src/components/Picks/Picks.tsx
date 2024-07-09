"use client";
import React, { useState } from "react";
import DifferentMarkets from "./DifferentMarkets";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Picks = () => {
  const [color, setColor] = useState(0);
  const router = useRouter();
  const togglePicks = (index: any) => {
    setColor(color === index ? null : index);
  };
  return (
    <>
      <div className="bg-[#1c1c21] relative flex justify-center items-center overflow-y-hidden">
        <div className="container mx-auto h-[calc(100vh-78px)]  justify-center items-center flex gap-7">
          <div className="flex flex-col gap-6 items-center absolute z-10">
            <span className="text-white font-semibold text-[48px] font-inter">
              Explore Different Derivative Picks
            </span>
            <div className="flex gap-10">
              <button
                className={`${
                  color === 1 ? "bg-[#066fd2]" : "bg-[#066fd2]"
                } text-white duration-200 px-[50px] py-[8px] rounded-[32px] font-medium text-[18px] font-inter`}
                onMouseEnter={() => togglePicks(1)}
                onMouseLeave={() => togglePicks(0)}
                onClick={() => router.push("/picks/equitymarkets")}
              >
                Equity Recommendation
              </button>
              <button
                className={`${
                  color === 2 ? "bg-[#066fd2]" : "bg-[#066fd2]"
                } text-white duration-200 px-[50px] py-[8px] rounded-[32px] font-medium text-[18px] font-inter`}
                onMouseEnter={() => togglePicks(2)}
                onMouseLeave={() => togglePicks(0)}
                onClick={() => router.push("/picks/markets")}
              >
                Equity Derivative
              </button>
            </div>
          </div>
        </div>
        <div className="absolute opacity-40 w-full">
          <object
            data="/svg/chart2.svg"
            type="image/svg+xml"
            className="w-full mx-auto"
          ></object>
        </div>
      </div>
    </>
  );
};

export default Picks;
