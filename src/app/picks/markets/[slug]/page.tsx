"use client";
import CustomInterval from "@/components/modals/CustomInterval";
import Spinner from "@/components/Spinner/Spinner";
import { fetchCSVAndSendEmail } from "@/helper/sendEmail";
import { Derivative } from "@/services/http/derivative";
import {
  DifferentMarketsIntervalData,
  intervalDerivativeOptions,
  intervalOptions,
} from "@/utils/content";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Option {
  symbol: string;
}

const page = ({ params }: { params: { slug: string } }) => {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const [callOption, SetCallOption] = useState(1);
  const [CallOptionsData, setCallOptionsData] = useState<Option[]>([]);
  const [PutOptionsData, setPutOptionsData] = useState<Option[]>([]);
  const [isSpinner, setIsSpinner] = useState(false);
  const [interval, setInterval] = useState("");
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
  const [emailData, setEmailData] = useState<string | null>(null);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [timeUnit, setTimeUnit] = useState("minutes");
  const [dropdownData, setDropdownData] = useState(intervalDerivativeOptions);
  const path = usePathname();

  const saveOption = (option: any) => {
    if (callOption === 1) {
      let savedOptions: any[] = JSON.parse(
        localStorage.getItem("derivativeCallOptionsData") || "[]"
      );
      savedOptions.push(option);
      console.log(savedOptions);
      localStorage.setItem(
        "derivativeCallOptionsData",
        JSON.stringify(savedOptions)
      );
    } else {
      let savedOptions: any[] = JSON.parse(
        localStorage.getItem("derivativePutOptionsData") || "[]"
      );
      savedOptions.push(option);
      localStorage.setItem(
        "derivativePutOptionsData",
        JSON.stringify(savedOptions)
      );
    }
    // You can also display a notification to indicate that the option has been saved.
  };

  // old code are as follows and commented out if needed

  // useEffect(() => {
  //   setIsSpinner(true);
  //   const portMap: { [key: string]: string } = {
  //     indian: "indianPort",
  //     american: "usport",
  //     uk: "ukport",
  //     hongkong: "hongkongport",
  //     saudiarebia: "saudiport",
  //   };
  //   let portProperty = portMap[params.slug];
  //   const port = (
  //     DifferentMarketsIntervalData?.find((item) => {
  //       return item.title === interval;
  //     }) as any
  //   )?.[portProperty];
  //   if (port) {
  //     Derivative.market(port)
  //       .then((res) => {
  //         const responseString = JSON.parse(res).response;
  //         const sections = responseString.split("Sell:");

  //         const parseSection = (sectionStr: string) => {
  //           const symbols = sectionStr.trim().split(",");
  //           return symbols
  //             .map((symbol) => ({ symbol }))
  //             .filter((obj) => obj.symbol.trim().length > 0);
  //         };

  //         const result = {
  //           buy: parseSection(sections[0].replace("Buy:", "")),
  //           sell: parseSection(sections[1]),
  //         };
  //         console.log(result);
  //         setCallOptionsData(result.buy as any);
  //         setPutOptionsData(result.sell as any);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => setIsSendEmail(true));
  //   } else {
  //     setIsSpinner(false);
  //   }
  // }, [params.slug, interval]);

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
      DifferentMarketsIntervalData?.find((item) => {
        return item.title === interval;
      }) as any
    )?.[portProperty];

    if (port) {
      setIsSpinner(true);
      Derivative.market(port)
        .then((res: string) => {
          setEmailData(res);
          setIsSendEmail(true);
        })
        .catch((err) => {
          console.log(err);
          setIsSendEmail(false);
        })
        .finally(() => setIsSpinner(false));
    } else {
      setIsSpinner(false);
      setIsSendEmail(false);
    }
  }, [params.slug, interval]);

  // fetch file from server and send email to user

  useEffect(() => {
    if (emailData) {
      fetchCSVAndSendEmail(emailData, setIsSendEmail);
    }
  }, [emailData]);

  const handleCustomIntervalChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomInterval(e.target.value);
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

  useEffect(() => {
    if (path === "/picks/markets/american") {
      setDropdownData(intervalDerivativeOptions);
    } else {
      const data = intervalDerivativeOptions.filter(
        (item) => item.label.toLowerCase() !== "earnings"
      );
      setDropdownData(data);
    }
  }, []);

  return (
    <>
      <div className="bg-[#1c1c21] relative flex justify-center min-h-[calc(100vh-78px)] ">
        <div className="flex gap-16 container relative z-50 justify-center pt-10 mx-auto px-[15px] ">
          <div className="pt-3">
            <Link className="flex gap-3" href={"/picks/markets"}>
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
            <div className="flex justify-between items-center">
              <div className="text-white font-inter 2xl:text-[38px] text-[32px] font-semibold">
                Intraday
              </div>
              <div className="flex flex-row justify-between items-center">
                {intervalOptions.map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    {group.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleIntervalSelect(option.value)}
                        className="text-center text-white py-1 px-2 min-w-[50px] rounded-[32px] bg-[#066fd2] hover:bg-[#066fd2] mr-2"
                      >
                        {option.label}
                      </button>
                    ))}
                  </React.Fragment>
                ))}
                <button
                  onClick={() => handleIntervalSelect("custom")}
                  className="text-center text-white py-1 px-2 min-w-[50px] rounded-[32px] bg-[#066fd2] hover:bg-[#066fd2] mr-2"
                >
                  Custom
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-6 ">
              <p className="text-white font-semibold 2xl:text-[38px] text-[32px] font-inter">
                Top 5 Equity Derivative picks for{" "}
                <span className="capitalize">
                  {countryMarket} in {interval}
                </span>{" "}
              </p>
              {/* <div className="flex w-full ">
                <button
                  className={`${
                    callOption === 1
                      ? "border-b-[3px] border-[#2f8446]"
                      : "border-b-[3px] border-[#26262a]"
                  } text-white duration-200 pb-[8px] font-medium w-full text-[16px] font-inter`}
                  onClick={() => SetCallOption(1)}
                >
                  Call Options
                </button>
                <button
                  className={`${
                    callOption === 2
                      ? "border-b-[3px] border-[#880909]"
                      : "border-b-[3px] border-[#26262a]"
                  } text-white duration-200 pb-[8px] font-medium w-full text-[16px] font-inter`}
                  onClick={() => SetCallOption(2)}
                >
                  Put Options
                </button>
              </div> */}
            </div>
            {/* <div
                id="stocks"
                className="flex flex-col justify-center items-center gap-5 mt-5 w-[1000px] overflow-y-scroll"
              >
                {isSpinner ? (
                  <Spinner color="#1c1c21" textColor="#fff" />
                ) : callOption === 1 ? (
                  CallOptionsData.map((item: any, index) => {
                    return (
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
                          onClick={() => {
                            saveOption(item);
                          }}
                          className="bg-[#3ca1ff] text-white font-inter px-[25px] text-[14px] font-medium rounded-[14px]"
                        >
                          Save
                        </button>
                      </div>
                    );
                  })
                ) : (
                  PutOptionsData.map((item: any, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full justify-between px-[12px] py-[8px] rounded-[8px] bg-[#880909]"
                      >
                        <div className="flex flex-col gap-[2px]">
                          <span className="font-inter text-[16px] font-medium text-white">
                            {item.symbol}
                          </span>
                          <span className="font-inter text-[14px] font-medium text-white opacity-50">
                            Call Option
                          </span>
                        </div>
                        <button className="bg-[#3ca1ff] text-white font-inter px-[25px] text-[14px] font-medium rounded-[14px]">
                          Save
                        </button>
                      </div>
                    );
                  })
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

export default page;
