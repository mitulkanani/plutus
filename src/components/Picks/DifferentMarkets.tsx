"use client"
import { Derivative } from '@/services/http/derivative';
import { DifferentMarketsData } from '@/utils/content';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DifferentMarkets = ({ isMarkets, SetIsMarkets }: any) => {
    const [color, setColor] = useState(0)
    const router = useRouter()
    const togglePicks = (index: any) => {
        setColor(color === index ? null : index);
    };
    const setMarketHandler = (item: string) => {
        localStorage.setItem('CountryMarket', item)
    }


    return (
        <>
            <div className='bg-[#1c1c21] relative flex justify-center items-center overflow-y-hidden'>
                <div className='container flex justify-center h-[calc(100vh-78px)] mx-auto pt-10 '>
                    <div className='flex flex-col justify-center gap-3 absolute z-10'>
                        <Link className='flex gap-3' href={"/picks"}>
                            <Image
                                src="/svg/leftarrow.svg"
                                alt="back arrow"
                                width={10}
                                height={10}
                                className='rotate-180'
                            />
                            <span className='font-inter text-[18px] text-[#3ca1ff] font-medium'>Back</span>
                        </Link>
                        <div className='h-[calc(100%-78px)] items-center flex flex-col gap-10'>
                            <div className='flex flex-col gap-6 items-center'>
                                <span className='text-white font-semibold 2xl:text-[38px] text-[32px] font-inter'>Explore Different Derivative Picks</span>
                                <div className='flex gap-10'>
                                    {
                                        DifferentMarketsData.map((item, index) => {
                                            return (
                                                <button onClick={() => { router.push(item.link), setMarketHandler(item.title) }} className={`${color === item.id ? "bg-[#066fd2]" : "bg-[#066fd2]"} text-white duration-200 px-[20px] py-[8px] rounded-[32px] font-medium text-[16px] font-inter`} onMouseEnter={() => togglePicks(item.id)} onMouseLeave={() => togglePicks(item.id)}>{`${item.title} Market`}</button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div>
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
        </>
    )
}

export default DifferentMarkets
