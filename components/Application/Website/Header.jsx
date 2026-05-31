'use client'
import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_ABOUT, WEBSITE_PRODUCTS, WEBSITE_CUSTOM_ORDERS, WEBSITE_PROCESS, WEBSITE_B2B, WEBSITE_CONTACT } from '@/routes/WebsiteRoute'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FaIndustry } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Cart from './Cart'
import { VscAccount } from "react-icons/vsc";
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import userIcon from '@/public/assets/images/user.png'
import { IoMdClose } from "react-icons/io";

import { HiMiniBars3 } from "react-icons/hi2";
import Search from './Search'


const Header = () => {
    const auth = useSelector(store => store.authStore.auth)
    const [isMobileMenu, setIsMobileMenu] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const pathname = usePathname()

    // close menu when route changes (covers Link navigation and programmatic nav)
    useEffect(() => {
        setIsMobileMenu(false)
    }, [pathname])

    return (
        <div className='bg-white border-b lg:px-32 px-4 relative'>
            <div className='flex justify-between items-center lg:py-5 py-3'>
                <Link href={WEBSITE_HOME}>
                    <div className="flex items-center gap-2 text-zinc-900">
                        <FaIndustry className="text-primary text-xl sm:text-2xl md:text-3xl" />
                        <span className="text-base sm:text-lg md:text-2xl font-black uppercase tracking-wider sm:tracking-widest whitespace-nowrap">MetalVero</span>
                    </div>
                </Link>

                <nav id='site-navigation' onClick={(e) => { if (e.currentTarget === e.target) setIsMobileMenu(false) }} className={`lg:relative lg:w-auto lg:h-auto lg:top-0 lg:left-0 lg:p-0 bg-white fixed z-50 top-0 w-full h-[100dvh] lg:h-auto overflow-y-auto lg:overflow-visible transition-all duration-300 ease-in-out lg:transition-none ${isMobileMenu ? 'left-0' : '-left-full'}`}>


                    <div className='lg:hidden flex justify-between items-center bg-gray-50 py-3 border-b px-3'>

                        <div className="flex items-center gap-2 text-zinc-900">
                            <FaIndustry size={24} className="text-primary" />
                            <span className="text-xl font-black uppercase tracking-wider">MetalVero</span>
                        </div>

                        <button type='button' onClick={() => setIsMobileMenu(false)} >
                            <IoMdClose size={25} className='text-gray-500 hover:text-primary' />
                        </button>

                    </div>


                    <ul className={`flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 lg:gap-6 px-3 py-4 lg:py-0 transition-opacity duration-200 ${isMobileMenu ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
                        <li className='text-gray-600 hover:text-primary hover:font-semibold whitespace-nowrap'>
                            <Link href={WEBSITE_HOME} className='block py-2' onClick={() => setIsMobileMenu(false)}>
                                Home
                            </Link>
                        </li>
                        <li className='text-gray-600 hover:text-primary hover:font-semibold whitespace-nowrap'>
                            <Link href={WEBSITE_ABOUT} className='block py-2' onClick={() => setIsMobileMenu(false)}>
                                About Factory
                            </Link>
                        </li>
                        <li className='text-gray-600 hover:text-primary hover:font-semibold whitespace-nowrap'>
                            <Link href={WEBSITE_PRODUCTS} className='block py-2' onClick={() => setIsMobileMenu(false)}>
                                Products
                            </Link>
                        </li>
                        <li className='text-gray-600 hover:text-primary hover:font-semibold whitespace-nowrap'>
                            <Link href={WEBSITE_CUSTOM_ORDERS} className='block py-2' onClick={() => setIsMobileMenu(false)}>
                                Custom Designs
                            </Link>
                        </li>
                        <li className='text-gray-600 hover:text-primary hover:font-semibold whitespace-nowrap'>
                            <Link href={WEBSITE_PROCESS} className='block py-2' onClick={() => setIsMobileMenu(false)}>
                                Process
                            </Link>
                        </li>
                        <li className='text-gray-600 hover:text-primary hover:font-semibold whitespace-nowrap'>
                            <Link href={WEBSITE_B2B} className='block py-2' onClick={() => setIsMobileMenu(false)}>
                                B2B Solutions
                            </Link>
                        </li>
                        <li className='text-gray-600 hover:text-primary hover:font-semibold whitespace-nowrap'>
                            <Link href={WEBSITE_CONTACT} className='block py-2' onClick={() => setIsMobileMenu(false)}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>


                <div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
                    <button type='button' onClick={() => setShowSearch(!showSearch)}>
                        <IoIosSearch
                            className='text-gray-500 hover:text-primary cursor-pointer'
                            size={20}
                        />
                    </button>

                    <Cart />

                    {!auth
                        ?
                        <Link href={WEBSITE_LOGIN}>
                            <VscAccount
                                className='text-gray-500 hover:text-primary cursor-pointer'
                                size={20}
                            />
                        </Link>
                        :

                        <Link href={USER_DASHBOARD}>
                            <Avatar >
                                <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                            </Avatar>
                        </Link>

                    }


                    <button type='button' className='lg:hidden block' aria-expanded={isMobileMenu} aria-controls='site-navigation' onClick={() => setIsMobileMenu(prev => !prev)} >
                        <HiMiniBars3 size={22} className='text-gray-500 hover:text-primary' />
                    </button>

                </div>
            </div>

            <Search isShow={showSearch} onClose={() => setShowSearch(false)} />

        </div>
    )
}

export default Header
