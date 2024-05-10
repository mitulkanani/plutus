"use client"
import { Derivative } from '@/services/http/derivative';
import { Pagination, PaginationItemType, cn } from "@nextui-org/react";
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';

const LatestNews = () => {
    const renderItem = ({
        ref,
        key,
        value,
        isActive,
        onNext,
        onPrevious,
        setPage,
        className,
    }: any) => {
        if (value === PaginationItemType.NEXT) {
            return (
                <button key={key} className={cn(className, "!bg-[#1c1c21] min-w-8 w-8 h-8")} onClick={onNext}>
                    <Image
                        src="/svg/rightarrow.svg"
                        alt="back arrow"
                        width={10}
                        height={10}
                        className='w-[12px] h-[12px]'
                    />
                </button>
            );
        }

        if (value === PaginationItemType.PREV) {
            return (
                <button key={key} className={cn(className, "!bg-[#1c1c21] min-w-8 w-8 h-8")} onClick={onPrevious}>
                    <Image
                        src="/svg/rightarrow.svg"
                        alt="back arrow"
                        width={10}
                        height={10}
                        className='rotate-180 w-[12px] h-[12px]'
                    />
                </button>
            );
        }

        if (value === PaginationItemType.DOTS) {
            return <button key={key}>...</button>;
        }

        // cursor is the default item
        return (
            <button
                key={key}
                ref={ref}
                className={cn(
                    className,
                    isActive ?
                        "text-white !bg-[#3d404a] font-bold" : "text-white !bg-[#1c1c21]",
                )}
                onClick={() => setPage(value)}
            >
                {value}
            </button>
        );
    };
    const [activeIndex, setActiveIndex] = useState(1);
    const [activeTab, setActiveTab] = useState(1)
    const [newsData, setNewsData] = useState<any>([]) // Initialize activeIndex to 1
    const [isSpinner, setIsSpinner] = useState(false)

    // Calculate the start and end index based on activeIndex and itemsPerPage
    const itemsPerPage = 4;
    const startIndex = (activeIndex - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the data for the current page
    const currentPageData = newsData.slice(startIndex, endIndex);

    useEffect(() => {
        setIsSpinner(true)
        if (activeTab === 1) {
            Derivative.market("http://18.218.201.198:8038/")
                .then((res) => {
                    setIsSpinner(false)
                    console.log(res)
                    setNewsData(res.economics.articles)
                }).catch((err) => {
                    console.log(err)
                    setIsSpinner(false)
                })
        } else if (activeTab === 2) {
            setNewsData([])
            Derivative.market("http://18.218.201.198:8032/")
                .then((res) => {
                    setIsSpinner(false)
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                    setIsSpinner(false)
                })
        }
    }, [activeTab])

    return (
        <div className='bg-[#1c1c21] relative flex justify-center items-center overflow-y-hidden'>
            <div className='flex flex-col gap-7 pt-10 items-center container mx-auto h-[calc(100vh-78px)] '>
                <div className='flex flex-col absolute z-10 gap-8 w-[1000px]'>
                    <span className='text-white text-start font-inter font-bold text-[32px]'>News</span>
                    <div className='bg-[#26303b] rounded-[32px] w-full p-[4px] flex justify-start'>
                        <div onClick={() => { setActiveTab(1) }} className={`${activeTab === 1 ? "bg-[#3ca1ff]" : "bg-[#26303b]"} w-1/2  duration-200 cursor-pointer rounded-[32px] px-[30px] py-[4px] flex justify-center`}>
                            <span className='text-white font-inter text-[15px] font-medium'>Latest News</span>
                        </div>
                        <div onClick={() => { setActiveTab(2) }} className={`${activeTab === 2 ? "bg-[#3ca1ff]" : "bg-[#26303b]"}  duration-200 w-1/2 cursor-pointer rounded-[32px] px-[30px] py-[4px]  flex justify-center`}>
                            <span className='text-white font-inter text-[15px] font-medium'>Portfolio News</span>
                        </div>
                    </div>
                    <div className={`${isSpinner ? "flex justify-center items-center" : ""}`}>
                        {isSpinner ?
                            <Spinner color="#1c1c21" textColor="#fff" />
                            : <div className='flex flex-col gap-4'>
                                {
                                    currentPageData.map((item: any, index: number) => {
                                        return (
                                            <div key={index} className='flex items-center justify-between'>
                                                <div className='flex items-center gap-3'>
                                                    <Link href={`${item.urlToImage}`} className='bg-[#3d404a] p-[10px] rounded-[8px] w-[45px] h-[45px]'>
                                                        <Image
                                                            src={"/svg/news.svg"}
                                                            alt="equity markets"
                                                            width={25}
                                                            height={25}
                                                            className='w-full h-full'
                                                        />
                                                    </Link>
                                                    <Link href={`${item.url}`} className='flex flex-col gap-[2px]'>
                                                        <span className='text-white font-inter lowercase font-medium text-[16px] max-w-[800px] line-clamp-1'>{item.title}</span>
                                                        <span className='text-white font-inter font-medium text-[14px] opacity-70 max-w-[800px] line-clamp-1'>{item.description}</span>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Image
                                                        src="/svg/rightarrow.svg"
                                                        alt="equity markets"
                                                        width={8}
                                                        height={10}
                                                        className=''
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='flex justify-center'>
                        <Pagination
                            showControls
                            total={Math.ceil(newsData.length / itemsPerPage)} // Calculate total pages
                            initialPage={activeIndex}
                            onChange={(index) => setActiveIndex(index)}
                            renderItem={renderItem}
                            radius='full'
                        />
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

export default LatestNews
