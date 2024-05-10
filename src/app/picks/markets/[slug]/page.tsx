"use client"
import Spinner from '@/components/Spinner/Spinner'
import { Derivative } from '@/services/http/derivative'
import { DifferentMarketsData } from '@/utils/content'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { slug: string } }) => {
    const [callOption, SetCallOption] = useState(1)
    const [CallOptionsData, setIsCallOptionsData] = useState([])
    const [PutOptionsData, setIsPutOptionsData] = useState([])
    const [isSpinner, setIsSpinner] = useState(false)
    const [countryMarket, setCountryMarket] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("CountryMarket") || "";
        } else {
            return ""; // Or any other default value you want
        }
    })
    console.log(params.slug);

    const saveOption = (option: any) => {
        if (callOption === 1) {
            let savedOptions: any[] = JSON.parse(localStorage.getItem('derivativeCallOptionsData') || '[]');
            savedOptions.push(option);
            console.log(savedOptions)
            localStorage.setItem('derivativeCallOptionsData', JSON.stringify(savedOptions));
        } else {
            let savedOptions: any[] = JSON.parse(localStorage.getItem('derivativePutOptionsData') || '[]');
            savedOptions.push(option);
            localStorage.setItem('derivativePutOptionsData', JSON.stringify(savedOptions));
        }
        // You can also display a notification to indicate that the option has been saved.
    };

    useEffect(() => {
        setIsSpinner(true)
        const filteredData: any = DifferentMarketsData.filter(item => item.title.toLowerCase().replace(/\s/g, '').includes(params.slug));
        // Here you can also set the market data for further use
        console.log(filteredData[0].port)
        Derivative.market(filteredData[0].port)
            .then((res) => {
                // const sections = res.split("Sell:");

                // // Function to convert comma-separated string to array of objects
                // const parseSection = (sectionStr: string) => {
                //     const symbols = sectionStr.trim().split(",");
                //     return symbols.map((symbol) => ({ symbol }));
                // };

                // // Creating the object with buy and sell keys
                // const result = {
                //     buy: parseSection(sections[0].replace("Buy:", "")),
                //     sell: parseSection(sections[1]),
                // };
                // console.log(result)
                // setIsCallOptionsData(result.buy as any)
                // setIsPutOptionsData(result.sell as any)
                setIsSpinner(false)
            }
            ).catch((err) => {
                console.log(err)
                setIsSpinner(false)
            }
            )
    }, [])

    return (
        <div className='bg-[#1c1c21] relative flex justify-center items-center overflow-y-hidden'>
            <div className='container h-[calc(100vh-78px)] flex justify-center pt-10 mx-auto px-[15px]'>
                <div className='flex flex-col absolute z-10 '>
                    <Link className='flex gap-3' href={"/picks/markets"}>
                        <Image
                            src="/svg/leftarrow.svg"
                            alt="back arrow"
                            width={10}
                            height={10}
                            className='rotate-180'
                        />
                        <span className='font-inter text-[18px] text-[#3ca1ff] font-medium'>Back</span>
                    </Link>
                    <div className='mt-4 flex flex-col items-center'>
                        <div className='flex flex-col gap-6 items-center'>
                            <p className='text-white font-semibold 2xl:text-[38px] text-[32px] font-inter'>Top 5 Derivative Picks for <span className='capitalize'>{countryMarket}</span> </p>
                            <div className='flex w-[1000px] '>
                                <button className={`${callOption === 1 ? "border-b-[3px] border-[#2f8446]" : "border-b-[3px] border-[#26262a]"} text-white duration-200 pb-[8px] font-medium w-full text-[16px] font-inter`} onClick={() => SetCallOption(1)}>Call Options</button>
                                <button className={`${callOption === 2 ? "border-b-[3px] border-[#880909]" : "border-b-[3px] border-[#26262a]"} text-white duration-200 pb-[8px] font-medium w-full text-[16px] font-inter`} onClick={() => SetCallOption(2)}>Put Options</button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-5 mt-5 w-[1000px]'>
                            {
                                isSpinner ?
                                    <Spinner color="#1c1c21" textColor="#fff" />
                                    : callOption === 1 ?
                                        CallOptionsData.map((item: any, index) => {
                                            return (
                                                <div key={index} className='flex w-full justify-between px-[12px] py-[8px] rounded-[8px] bg-[#055f0e]'>
                                                    <div className='flex flex-col gap-[2px]'>
                                                        <span className='font-inter text-[16px] font-medium text-white'>{item.symbol}</span>
                                                        <span className='font-inter text-[14px] font-medium text-white opacity-50'>Call Option</span>
                                                    </div>
                                                    <button onClick={() => saveOption(item)} className='bg-[#3ca1ff] text-white font-inter px-[25px] text-[14px] font-medium rounded-[14px]'>Save</button>
                                                </div>
                                            )
                                        })
                                        :
                                        PutOptionsData.map((item: any, index) => {
                                            return (
                                                <div key={index} className='flex justify-between px-[12px] py-[8px] rounded-[8px] bg-[#880909]'>
                                                    <div className='flex flex-col gap-[2px]'>
                                                        <span className='font-inter text-[16px] font-medium text-white'>{item.symbol}</span>
                                                        <span className='font-inter text-[14px] font-medium text-white opacity-50'>Call Option</span>
                                                    </div>
                                                    <button className='bg-[#3ca1ff] text-white font-inter px-[25px] text-[14px] font-medium rounded-[14px]'>Save</button>
                                                </div>
                                            )
                                        })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute opacity-40 w-full'>
                <object
                    data="/svg/chart2.svg"
                    type="image/svg+xml"
                    className="w-full mx-auto"
                ></object>
            </div>
        </div>
    )
}

export default page
