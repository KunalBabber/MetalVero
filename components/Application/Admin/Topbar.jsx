'use client'
import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import UserDropdown from './UserDropdown'
import { Button } from '@/components/ui/button'
import { RiMenu4Fill } from "react-icons/ri";
import { useSidebar } from '@/components/ui/sidebar';
import AdminSearch from './AdminSearch'
import { FaIndustry } from "react-icons/fa6"
import Image from 'next/image'
import AdminMobileSearch from './AdminMobileSearch'
const Topbar = () => {
    const { toggleSidebar } = useSidebar()

    return (
        <div className='fixed border h-14 w-full top-0 left-0 z-30 md:ps-72 md:pe-8 px-5 flex justify-between items-center bg-white dark:bg-card'>

            <div className='flex items-center md:hidden gap-2 text-zinc-900 dark:text-zinc-100'>
                <FaIndustry size={24} className="text-primary" />
                <span className="text-xl font-black uppercase tracking-widest">MetalVero</span>
            </div>
            <div className='md:block hidden'>
                <AdminSearch />
            </div>


            <div className='flex items-center gap-2'>
                <AdminMobileSearch />
                <ThemeSwitch />
                <UserDropdown />
                <Button onClick={toggleSidebar} type="button" variant="outline" size="icon" className="md:hidden flex shrink-0">
                    <RiMenu4Fill className="!size-5" />
                </Button>
            </div>

        </div>
    )
}

export default Topbar
