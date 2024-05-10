"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SavedData = ({ isSavedData, setIsSavedData }: any) => {
    const [callOption, setCallOption] = useState(1);
    const [CallOptionsData, setCallOptionsData] = useState(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem("callOptionsData") as any) || [];
        } else {
            return []; // Or any other default value you want
        }
    });
    const [PutOptionsData, setPutOptionsData] = useState(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem("putOptionsData") as any) || [];
        } else {
            return []; // Or any other default value you want
        }
    });
    console.log(CallOptionsData, "CallOptionsData")
    console.log(PutOptionsData, "PutOptionsData")
    return (
        <>
            {
                isSavedData &&
                <div className='bg-[#1c1c21] relative flex justify-center items-center'>
                    <div className='pt-10 container flex justify-center h-[calc(100vh+78px)]  mx-auto'>
                        <div className='absolute z-10 flex gap-16'>
                            <div className='pt-3'>
                                <Link className='flex gap-3' href={"/portfolio"} onClick={() => setIsSavedData(false)}>
                                    <Image
                                        src="/svg/leftarrow.svg"
                                        alt="back arrow"
                                        width={10}
                                        height={10}
                                        className='rotate-180'
                                    />
                                    <span className='font-inter text-[18px] text-[#3ca1ff] font-medium'>Back</span>
                                </Link>
                            </div>
                            <div className='flex flex-col  w-[1200px] gap-16'>
                                <div className='flex flex-col  gap-7 w-full'>
                                    <div className='flex flex-col absolute z-10 mt-16'>
                                        <div className='mt-4 flex flex-col items-center'>
                                            <div className='flex flex-col gap-6 items-center'>
                                                <div className='flex w-[1000px] '>
                                                    <button className={`${callOption === 1 ? "border-b-[3px] border-[#2f8446]" : "border-b-[3px] border-[#26262a]"} text-white duration-200 pb-[8px] font-medium w-full text-[16px] font-inter`} onClick={() => setCallOption(1)}>Call Options</button>
                                                    <button className={`${callOption === 2 ? "border-b-[3px] border-[#880909]" : "border-b-[3px] border-[#26262a]"} text-white duration-200 pb-[8px] font-medium w-full text-[16px] font-inter`} onClick={() => setCallOption(2)}>Put Options</button>
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-center items-center gap-5 mt-5 w-[1000px]'>
                                                {callOption === 1 ?
                                                    CallOptionsData?.map((item: any, index: number) => {
                                                        return (
                                                            <div key={index} className='flex w-full justify-between px-[12px] py-[8px] rounded-[8px] bg-[#055f0e]'>
                                                                <div className='flex flex-col gap-[2px]'>
                                                                    <span className='font-inter text-[16px] font-medium text-white'>{item.symbol}</span>
                                                                    <span className='font-inter text-[14px] font-medium text-white opacity-50'>Call Option</span>
                                                                </div>
                                                                <button className='bg-[#3ca1ff] text-white font-inter px-[25px] text-[14px] font-medium rounded-[14px]'>Save</button>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    PutOptionsData?.map((item: any, index: number) => {
                                                        return (
                                                            <div key={index} className='flex w-full justify-between px-[12px] py-[8px] rounded-[8px] bg-[#880909]'>
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
                </div>}
        </>
    )
}

export default SavedData
