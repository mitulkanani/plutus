"use client"
import { Derivative } from '@/services/http/derivative'
import { AnalysisViewRegion } from '@/utils/content'
import { useFormik } from 'formik'
import Image from 'next/image'
import React, { useState } from 'react'
import Spinner from '../Spinner/Spinner'

interface FormValues {
    symbol: string;
}

const AnalysisView = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isMarket, setIsMarket] = useState("")
    const [isSpinner, setIsSpinner] = useState(false)
    const formik = useFormik({
        initialValues: {
            symbol: ""
        },
        onSubmit: async (values) => {
            setIsSpinner(true)
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, String(value)); // Explicitly cast value to string
            });

            Derivative.Portfolio(isMarket, formData)
                .then((res) => {
                    console.log(res)
                    setIsSpinner(false)
                }).catch((err) => {
                    console.log(err)
                    setIsSpinner(false)
                })
        },
    });

    return (
        <>
            <div className='bg-[#1c1c21] relative flex justify-center items-center overflow-y-hidden'>
                <div className='flex justify-between gap-20 items-start pt-20 container mx-auto h-[calc(100vh-78px)] '>
                    {isSubmit &&
                        <form onSubmit={formik.handleSubmit} className=' w-fit container mx-auto flex flex-col'>
                            <div className='flex flex-col absolute z-10 gap-10 items-center'>
                                <span className='font-inter text-white text-[28px] font-semibold'>Enter Symbol</span>
                                <div className='flex gap-2'>
                                    <input
                                        id="symbol"
                                        name="symbol"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.symbol}
                                        className='px-3 text-black text-[16px] font-inter py-2 rounded-[7px]'
                                    />
                                    <button type="submit" className='text-white w-fit font-inter font-medium text-[18px] px-[20px] py-[8px] bg-[#3ca1ff] rounded-[8px]'>

                                        {
                                            isSpinner ? <Spinner color="#1c1c21" textColor="#fff" /> : "Submit"
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>}

                    <div className='flex flex-col justify-center gap-4 absolute z-10'>
                        <span className='text-white font-inter font-semibold text-[32px]'>Analysis View</span>
                        <div className='flex flex-col gap-5'>
                            <div className='flex items-center gap-4'>
                                <div>
                                    <Image
                                        src="/svg/analysisview.svg"
                                        alt=""
                                        width={40}
                                        height={20}
                                    />
                                </div>
                                <div className='flex flex-col gap-[2px]'>
                                    <span className='text-white font-inter text-[18px] font-medium'>Market Analysis</span>
                                    <span className='text-[#666668] font-inter font-medium text-[14px]'>Select region for details</span>
                                </div>
                            </div>
                            <div>
                                {
                                    AnalysisViewRegion.map((item, index) => {
                                        return (
                                            <div key={index} className={`${activeIndex === item.id ? "bg-[#3ca1ff]" : ""} cursor-pointer rounded-[32px] px-3 py-2 flex gap-4`} onClick={() => { setActiveIndex(item.id), setIsSubmit(true), setIsMarket(item.port) }}>
                                                <div>
                                                    <Image
                                                        src={item.image}
                                                        alt=""
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                                <span className='text-white font-inter font-medium text-[16px]'>{item.title}</span>
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
        </>
    )
}

export default AnalysisView
