"use client";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { Derivative } from "@/services/http/derivative";
import {
  CallOptionsData as CallOptionsDataType,
  EquityMarketsData,
  intervalsData,
} from "@/utils/content";
import Image from "next/image";
import Link from "next/link";

interface Option {
  symbol: string;
}

const Page = ({ params }: { params: { slug: string } }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [callOption, setCallOption] = useState(1);
  const [CallOptionsData, setCallOptionsData] = useState<Option[]>([]);
  const [PutOptionsData, setPutOptionsData] = useState<Option[]>([]);
  const [interval, setInterval] = useState("15 minutes");
  const [isSpinner, setIsSpinner] = useState(false);
  const [isSave, setIsSave] = useState<number | null>(null);
  const [countryMarket, setCountryMarket] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("CountryMarket") || "";
    } else {
      return "";
    }
  });

  // Function to save the selected option
  const saveOption = (option: Option, index: number) => {
    if (isSave !== index + 1) {
      setIsSave(index + 1);
      const storageKey =
        callOption === 1 ? "callOptionsData" : "putOptionsData";
      const savedOptions: Option[] = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );

      const optionExists = savedOptions.some(
        (savedOption) => savedOption.symbol === option.symbol
      );

      if (!optionExists) {
        savedOptions.push(option);
        localStorage.setItem(storageKey, JSON.stringify(savedOptions));
        console.log(savedOptions);
      }
      // You can also display a notification to indicate that the option has been saved.
    }
  };

  useEffect(() => {
    setIsSpinner(true);

    const portMap: { [key: string]: string } = {
      indian: "indianPort",
      american: "usport",
      uk: "ukport",
      hongkong: "hongkongport",
      saudiarebia: "saudiport",
    };

    let portProperty = portMap[params.slug];
    const port = (
      intervalsData?.find((item) => item.title === interval) as any
    )?.[portProperty];

    if (port) {
      Derivative.market(port)
        .then((res) => {
          const responseString = JSON.parse(res).response;
          const sections = responseString.split("Sell:");

          const parseSection = (sectionStr: string) => {
            const symbols = sectionStr.trim().split(",");
            return symbols
              .map((symbol) => ({ symbol }))
              .filter((obj) => obj.symbol.trim().length > 0);
          };

          const result = {
            buy: parseSection(sections[0].replace("Buy:", "")),
            sell: parseSection(sections[1]),
          };
          setCallOptionsData(result.buy as any);
          setPutOptionsData(result.sell as any);
          setIsSpinner(false);
        })
        .catch((err) => {
          console.log(err);
          setIsSpinner(false);
        });
    } else {
      setIsSpinner(false);
    }
  }, [params.slug, interval]);

  return (
    <div className="bg-[#1c1c21] relative flex justify-center min-h-[calc(100vh-78px)]">
      <div className="flex gap-16 container relative z-50 justify-center pt-10 mx-auto px-[15px] ">
        <div className="pt-3">
          <Link className="flex gap-3" href={"/picks/equitymarkets"}>
            <Image
              src="/svg/leftarrow.svg"
              alt="back arrow"
              width={10}
              height={10}
              className="rotate-180"
            />
            <span className="font-inter text-[18px] text-[#3ca1ff] font-medium">
              Back
            </span>
          </Link>
        </div>
        <div className="flex flex-col w-[1200px] gap-5 3xl:gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-white font-inter 2xl:text-[38px] text-[32px] font-semibold">
              Intervals
            </span>
            <div className="bg-[#26303b] mt-2 rounded-[32px] p-[4px] flex gap-2 justify-center w-fit">
              {intervalsData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setInterval(item.title);
                  }}
                  className={`${
                    activeIndex === index ? "bg-[#3ca1ff]" : "bg-[#26303b]"
                  } duration-200 cursor-pointer rounded-[32px] px-[30px] py-[10px]`}
                >
                  <span className="text-white flex justify-center font-inter text-[15px] font-medium">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-7 w-full">
            <div className="text-white font-inter 2xl:text-[36px] text-[32px] font-semibold">
              Top 5 Picks for {countryMarket} in {interval}
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex w-[1000px]">
                <button
                  className={`${
                    callOption === 1
                      ? "border-b-[3px] border-[#2f8446]"
                      : "border-b-[3px] border-[#26262a]"
                  } text-white duration-200 pb-[8px] font-medium w-full text-[16px] font-inter`}
                  onClick={() => setCallOption(1)}
                >
                  Call Options
                </button>
                <button
                  className={`${
                    callOption === 2
                      ? "border-b-[3px] border-[#880909]"
                      : "border-b-[3px] border-[#26262a]"
                  } text-white duration-200 pb-[8px] font-medium w-full text-[16px] font-inter`}
                  onClick={() => setCallOption(2)}
                >
                  Put Options
                </button>
              </div>
              <div className="flex flex-col justify-center items-center gap-5 mt-5 w-[1000px]">
                {isSpinner ? (
                  <Spinner color="#1c1c21" textColor="#fff" />
                ) : callOption === 1 ? (
                  CallOptionsData.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full justify-between px-[12px] py-[8px] rounded-[8px] bg-[#055f0e]"
                    >
                      <div className="flex flex-col gap-[2px]">
                        <span className="font-inter text-[16px] font-medium text-white">
                          {item.symbol}
                        </span>
                        <span className="font-inter text-[14px] font-medium text-white opacity-50">
                          Call Option
                        </span>
                      </div>
                      <button
                        onClick={() => saveOption(item, index)}
                        className={`${
                          isSave === index + 1
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } bg-[#3ca1ff] text-white active:scale-75 font-inter px-[25px] text-[14px] font-medium rounded-[14px]`}
                      >
                        Save
                      </button>
                    </div>
                  ))
                ) : (
                  PutOptionsData.map((item, index) => (
                    <div
                      key={index}
                      className="flex w-full justify-between px-[12px] py-[8px] rounded-[8px] bg-[#880909]"
                    >
                      <div className="flex flex-col gap-[2px]">
                        <span className="font-inter text-[16px] font-medium text-white">
                          {item.symbol}
                        </span>
                        <span className="font-inter text-[14px] font-medium text-white opacity-50">
                          Put Option
                        </span>
                      </div>
                      <button
                        onClick={() => saveOption(item, index)}
                        className={`${
                          isSave === index + 1
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } bg-[#3ca1ff] text-white active:scale-75 font-inter px-[25px] text-[14px] font-medium rounded-[14px]`}
                      >
                        Save
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute opacity-40 max-h-[calc(100vh-78px)] overflow-hidden w-full">
        <object
          data="/svg/chart2.svg"
          type="image/svg+xml"
          className="w-full mx-auto"
        ></object>
      </div>
    </div>
  );
};

export default Page;
