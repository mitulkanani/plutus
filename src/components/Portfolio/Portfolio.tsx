import { PortfolioSimulationData } from '@/utils/content'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type setSubmit = {
    setIsSubmit: (val: boolean) => void
}

const Portfolio = ({ setIsSubmit }: setSubmit) => {
    return (
        <div className='bg-[#1c1c21]'>
            <div className='pt-10 container mx-auto flex flex-col h-[calc(100vh-78px)]  gap-5'>
                <Link className='flex gap-3 pl-[50px]' href={"/portfolio"} onClick={() => setIsSubmit(false)}>
                    <Image
                        src="/svg/leftarrow.svg"
                        alt="back arrow"
                        width={10}
                        height={10}
                        className='rotate-180'
                    />
                    <span className='font-inter text-[18px] text-[#3ca1ff] font-medium'>Back</span>
                </Link>
                <div className='flex flex-col items-center gap-10'>
                    <span className='text-white font-inter 2xl:text-[38px] text-[32px] font-bold'>Portfolio Simulation Results</span>
                    <div className='flex gap-4'>
                        {
                            PortfolioSimulationData.map((item, index) => {
                                return (
                                    <div key={index} className='flex flex-col px-[20px] min-w-[180px] py-[15px] gap-3 border border-[#282b31] rounded-[10px]'>
                                        <span className='text-[#8d8d90] text-[18px] font-medium font-inter'>{item.title}</span>
                                        <span className='text-white text-[22px] font-medium font-inter'>{item.number}</span>
                                    </div>
                                )
                            })
                        }
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Portfolio
