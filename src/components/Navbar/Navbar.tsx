"use client"
import { navbarData } from '@/utils/content'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeTab')
        } else {
            return ""
        }
    })
    const [isLogin, setIsLogin] = useState(false)
    const router = useRouter()
    const toggleMenu = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const activeTabHandler = (index: any) => {
        console.log(index)
        localStorage.setItem('activeTab', index as any)
        setActiveTab(localStorage.getItem('activeTab') as any)
    }
    console.log(activeTab)
    return (
        <div className='border-b border-[#7c7c7e] relative  z-[9999]'>
            <div className='flex justify-between px-[50px] container mx-auto h-[77px] items-center'>
                <div>
                    <Link href={"/"} className='font-inter text-[#e0dcbb] font-semibold text-[32px]'>Plutus</Link>
                </div>
                <div className='flex gap-[60px] items-center'>
                    <div className='flex gap-10'>
                        {
                            navbarData.map((item, index) => {
                                return (
                                    <span key={index} onClick={() => { router.push(item.link), activeTabHandler(item.id) }} onMouseEnter={() => toggleMenu(item.id)} onMouseLeave={() => toggleMenu(item.id)} className={`${(activeIndex == item.id) || (activeTab as any == item.id) ? "text-[#365c7c]" : "text-white"} font-medium duration-200 cursor-pointer text-[16px] font-inter`}>{item.title}</span>
                                )
                            })
                        }
                    </div>
                    <div className='flex gap-[50px]'>
                        <div className='flex gap-[16px]'>
                            <div className={`${!isLogin ? "bg-[#369eff] text-white" : "bg-[#f0f2f5] text-black"} rounded-[32px] px-[20px] py-[8px]`} onClick={() => setIsLogin(false)}>
                                <span className=' font-medium text-[16px] font-inter' >Sign Up</span>
                            </div>
                            <div className={`${isLogin ? "bg-[#369eff] text-white" : "bg-[#f0f2f5] text-black"} rounded-[32px] px-[20px] py-[8px]`} onClick={() => setIsLogin(true)}>
                                <span className=' font-medium text-[16px] font-inter' >Log in</span>
                            </div>
                        </div>
                        <div className='rounded-full bg-[#e0dcbb] h-fit px-3 py-1'>
                            <span className='text-black font-medium text-[20px] font-inter'>T</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
