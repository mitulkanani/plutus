"use client";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { Derivative } from "@/services/http/derivative";
import {
  CallOptionsData as CallOptionsDataType,
  EquityMarketsData,
  intervalOptions,
  intervalsData,
} from "@/utils/content";
import Image from "next/image";
import Link from "next/link";
import CustomInterval from "@/components/modals/CustomInterval";
import toast from "react-hot-toast";

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
  const [customInterval, setCustomInterval] = useState<any>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomInterval, setIsCustomInterval] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [timeUnit, setTimeUnit] = useState("minutes");
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
    setTimeout(() => {
      setIsSendEmail(true);
    }, 60000);
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
          setIsSendEmail(true);
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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsSpinner(false);
    }
  }, [params.slug, interval]);

  const handleCustomIntervalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomInterval(parseInt(e.target.value));
  };

  const handleAddCustomInterval = () => {
    if (customInterval > 0) {
      setInterval(`${customInterval} ${timeUnit}`);
      setCustomInterval("");
      setIsDropdownOpen(false);
      setIsCustomInterval(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleIntervalSelect = (value: string) => {
    if (value === "custom") {
      setIsCustomInterval(true);
      setInterval(value);
      setIsDropdownOpen(false);
    } else {
      setInterval(value);
      setIsDropdownOpen(false);
    }
  };

  console.log(interval);
  return (
    <>
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
            <div className="flex gap-6 items-center">
              <span className="text-white font-inter 2xl:text-[38px] text-[32px] font-semibold">
                Intraday
              </span>
              <div className="relative">
                <div
                  onClick={toggleDropdown}
                  className="flex items-center gap-4 bg-[#26303b] rounded-[16px] px-5 py-2  cursor-pointer"
                >
                  <div className="bg-[#26303b] text-white w-fit">
                    {interval}
                  </div>
                  <div>
                    <Image
                      src={"/svg/downarrow.svg"}
                      alt="down arrow"
                      width={14}
                      height={14}
                    />
                  </div>
                </div>
                {isDropdownOpen && (
                  <div
                    id="structure"
                    className="absolute mt-2 bg-[#26303b] w-[150px] max-h-[250px] overflow-y-auto rounded-lg shadow-xl py-2 px-2 z-10"
                  >
                    <div className="flex flex-col">
                      {intervalOptions.map((group, groupIndex) => (
                        <React.Fragment key={groupIndex}>
                          <span className="font-bold text-white">
                            {group.label}
                          </span>
                          {group.options.map((option, optionIndex) => (
                            <div
                              onClick={() => handleIntervalSelect(option.value)}
                              className="w-full hover:bg-[#3ca1ff] rounded"
                            >
                              <button
                                key={optionIndex}
                                className="text-white w-fit py-1 px-4"
                              >
                                {option.label}
                              </button>
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                      <button
                        className="text-white py-1 px-3 rounded hover:bg-[#3ca1ff] mt-2"
                        onClick={() => handleIntervalSelect("custom")}
                      >
                        Custom
                      </button>
                      {/* {interval === "custom" && (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={customInterval}
                            onChange={handleCustomIntervalChange}
                            className="p-2 border rounded w-full"
                            placeholder="Enter custom interval"
                          />
                          <button
                            onClick={handleAddCustomInterval}
                            className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
                          >
                            Add Custom Interval
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-7 w-full">
              <div className="text-white font-inter 2xl:text-[36px] text-[32px] font-semibold">
                Top 5 Picks for {countryMarket} in {interval}
              </div>
              <div className="mt-4 flex flex-col">
                {/* <div className="flex w-full">
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
                </div> */}
                {/* <div className="flex flex-col justify-center items-center gap-5 mt-5 w-[1000px]">
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
                </div> */}
                {!isSendEmail ? (
                  <div className="flex justify-center mt-5 items-center">
                    <Spinner color="#1c1c21" textColor="#fff" />
                  </div>
                ) : (
                  <div className="mt-10 flex gap-10 items-center">
                    <span className="text-[32px] font-semibold text ">
                      Please check your registered email address
                    </span>
                    <div className="bg-green-600 rounded-full p-2">
                      <Image
                        src={"/svg/right-icon-white.svg"}
                        alt="right-icon-white"
                        width={28}
                        height={28}
                      />
                    </div>
                  </div>
                )}
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
      <CustomInterval
        setForModal={setIsCustomInterval}
        forModal={isCustomInterval}
        customInterval={customInterval}
        handleCustomIntervalChange={handleCustomIntervalChange}
        handleAddCustomInterval={handleAddCustomInterval}
        setCustomInterval={setInterval}
        timeUnit={timeUnit}
        setTimeUnit={setTimeUnit}
      />
    </>
  );
};

export default Page;
