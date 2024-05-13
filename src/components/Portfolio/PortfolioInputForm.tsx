"use client"
import React, { useState } from 'react'
import { useFormik } from 'formik';
import Portfolio from './Portfolio';
import Image from 'next/image';
import Link from 'next/link';
import { Derivative } from '@/services/http/derivative';
import SavedData from './SavedData';
import DerivativeSavedData from './DerivativeSavedData';
import Spinner from '../Spinner/Spinner';


interface FormValues {
    years: string;
    num_stocks: string;
    days: string;
    stock_0: string;
    amount_0: string;
}

const PortfolioInputForm = () => {
    const [isSubmit, setIsSubmit] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [isForm, setIsForm] = useState(false)
    const [isSavedData, setIsSavedData] = useState(false)
    const [isDerivativeSavedData, setIsDerivativeSavedData] = useState(false)
    const [isSpinner, setIsSpinner] = useState(false)
    const formik = useFormik<FormValues>({
        initialValues: {
            years: "",
            num_stocks: "",
            days: "",
            stock_0: "",
            amount_0: ""
        },
        onSubmit: (values: FormValues) => {
            setIsSpinner(true)
            console.log(values, "values")

            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value.toString()); // Convert value to string
            });

            Derivative.Portfolio("/portfolio/analysis", formData)
                .then((res) => {
                    console.log(res)
                    setIsSpinner(false)
                    setIsSubmit(true)
                }).catch((err) => {
                    console.log(err)
                    setIsSpinner(false)
                })
        },
    });

    const riskAnalysisHandler = (port: string) => {

    }
    console.log(isSavedData)
    console.log(isDerivativeSavedData)
    return (
        <>
            {isSubmit ?
                <Portfolio setIsSubmit={setIsSubmit} />
                : isForm ?
                    <div className='bg-[#1c1c21] relative flex justify-center overflow-y-hidden h-[calc(100vh-78px)] pt-10 '>
                        <div className='h-[calc(100vh-78px)] absolute z-10 container mx-auto flex flex-col overflow-y-hidden'>
                            <Link className='flex gap-3' href={"/portfolio"} onClick={() => setIsForm(false)}>
                                <Image
                                    src="/svg/leftarrow.svg"
                                    alt="back arrow"
                                    width={10}
                                    height={10}
                                    className='rotate-180'
                                />
                                <span className='font-inter text-[18px] text-[#3ca1ff] font-medium'>Back</span>
                            </Link>
                            <form onSubmit={formik.handleSubmit} className=' pt-10 flex flex-col items-center gap-12'>
                                <div className='flex flex-col gap-10 absolute z-10 items-center'>
                                    <span className='font-inter text-white 2xl:text-[38px] text-[32px] font-semibold'>Stock Portfolio input form</span>
                                    <div className='flex flex-col gap-x-10 gap-y-5'>
                                        <div className='flex w-[400px] flex-col gap-2'>
                                            <label htmlFor="firstName" className='text-[#9a9a9c] text-[16px] font-inter font-medium '>Enter the number of years in consideration</label>
                                            <input
                                                id="years"
                                                name="years"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.years}
                                                className='px-3 text-black text-[16px] font-inter py-2 rounded-[7px]'
                                            />
                                        </div>
                                        <div className='flex w-[400px] flex-col gap-2'>
                                            <label htmlFor="lastName" className='text-[#9a9a9c] text-[16px] font-inter font-medium '>Enter how many stocks your portfolio has</label>
                                            <input
                                                id="num_stocks"
                                                name="num_stocks"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.num_stocks}
                                                className='px-3 text-black py-2 rounded-[7px]'
                                            />
                                        </div>
                                        <div className='flex w-[400px] flex-col gap-2'>
                                            <label htmlFor="email" className='text-[#9a9a9c] text-[16px] font-inter font-medium '>Enter the number of days in consideration</label>
                                            <input
                                                id="days"
                                                name="days"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.days}
                                                className='px-3 text-black py-2 rounded-[7px]'
                                            />
                                        </div>
                                        <div className='flex w-[400px] flex-col gap-2'>
                                            <label htmlFor="email" className='text-[#9a9a9c] text-[16px] font-inter font-medium '>Stock Symbol</label>
                                            <input
                                                id="stock_0"
                                                name="stock_0"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.stock_0}
                                                className='px-3 text-black py-2 rounded-[7px]'
                                            />
                                        </div>
                                        <div className='flex w-[400px] flex-col gap-2'>
                                            <label htmlFor="email" className='text-[#9a9a9c] text-[16px] font-inter font-medium '>Amount</label>
                                            <input
                                                id="amount_0"
                                                name="amount_0"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.amount_0}
                                                className='px-3 text-black py-2 rounded-[7px]'
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" onClick={() => riskAnalysisHandler("http://18.218.201.198:8026/")} className='text-white w-[100px] font-inter font-medium text-[18px] px-[20px] py-[8px] bg-[#3ca1ff] rounded-[8px]'>
                                        {
                                            isSpinner ? <Spinner color="#1c1c21" textColor="#fff" /> : "Submit"
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='absolute top-0 opacity-40 w-full'>
                            <object
                                data="/svg/chart2.svg"
                                type="image/svg+xml"
                                className="w-full mx-auto"
                            ></object>
                        </div>
                    </div> :
                    isSavedData ?
                        <SavedData isSavedData={isSavedData} setIsSavedData={setIsSavedData} />
                        : isDerivativeSavedData ?
                            <DerivativeSavedData isDerivativeSavedData={isDerivativeSavedData} setIsDerivativeSavedData={setIsDerivativeSavedData} />
                            :
                            <div className='bg-[#1c1c21] relative flex justify-center overflow-y-hidden h-[calc(100vh-78px)] pt-10 '>
                                <div className='h-[calc(100vh-78px)] pt-10 container mx-auto flex flex-col items-center gap-12'>
                                    <div className='flex flex-col absolute z-10 pt-20 w-fit gap-20'>
                                        <div className='flex flex-col gap-4'>
                                            <div className={`bg-[#369eff] cursor-pointer rounded-[32px] px-[20px] py-[8px]`} onClick={() => { setIsLogin(false), setIsSavedData(true) }}>
                                                <span className=' font-medium flex justify-center text-[16px] font-inter' >Saved Equity Picks</span>
                                            </div>
                                            <div className={`bg-[#369eff] cursor-pointer rounded-[32px] px-[20px] py-[8px]`} onClick={() => { setIsLogin(true), setIsDerivativeSavedData(true) }}>
                                                <span className=' font-medium text-[16px] font-inter' >Saved Derivative Picks</span>
                                            </div>
                                        </div>
                                        <div className='cursor-pointer' onClick={() => setIsForm(true)}>
                                            <span className='flex justify-center rounded-[32px]  font-inter border border-[#369eff] px-[20px] py-[8px]'>Risk Analysis</span>
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

            }
        </>
    )
}

export default PortfolioInputForm
