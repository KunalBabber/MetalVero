import Image from 'next/image'
import React from 'react'
import { FaIndustry } from "react-icons/fa6";
import Link from 'next/link'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FiTwitter } from "react-icons/fi";

import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_REGISTER, WEBSITE_ABOUT, WEBSITE_PRODUCTS, WEBSITE_CUSTOM_ORDERS, WEBSITE_PROCESS, WEBSITE_B2B, WEBSITE_CONTACT, WEBSITE_RFQ } from '@/routes/WebsiteRoute'
const Footer = () => {
    return (
        <footer className='bg-gray-50 border-t'>
            <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4'>

                <div className='lg:col-span-1 md:col-span-2 col-span-1'>
                    <div className="flex items-center gap-2 text-zinc-900 mb-4">
                        <FaIndustry size={32} className="text-primary" />
                        <span className="text-3xl font-black uppercase tracking-widest">MetalVero</span>
                    </div>
                    <p className='text-gray-500 text-sm'>
                        Premier manufacturer of high-quality Iron and Steel furniture. We specialize in custom fabrication, bulk production, and B2B supply for hotels, offices, and contractors.
                    </p>
                </div>


                <div>
                    <h4 className='text-xl font-bold uppercase mb-5'>Our Products</h4>
                    <ul>
                        <li className='mb-2 text-gray-500'>
                            <Link href={`${WEBSITE_PRODUCTS}?category=iron-furniture`}>Iron Furniture</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={`${WEBSITE_PRODUCTS}?category=steel-furniture`}>Steel Furniture</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_CUSTOM_ORDERS}>Custom Designs</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_B2B}>Hotel & Restaurant</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_B2B}>Office Solutions</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className='text-xl font-bold uppercase mb-5'>Factory Links</h4>
                    <ul>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_HOME}>Home</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_ABOUT}>About Factory</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_PROCESS}>Manufacturing Process</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_B2B}>B2B Solutions</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_CONTACT}>Contact Us</Link>
                        </li>

                    </ul>
                </div>
                <div>
                    <h4 className='text-xl font-bold uppercase mb-5'>Help Center</h4>
                    <ul>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_REGISTER}>Register</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={WEBSITE_LOGIN}>Login</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href={USER_DASHBOARD}>My Account</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li className='mb-2 text-gray-500'>
                            <Link href="/terms-and-conditions">Terms & Conditions</Link>
                        </li>


                    </ul>
                </div>
                <div>
                    <h4 className='text-xl font-bold uppercase mb-5'>Contact Us </h4>
                    <ul>
                        <li className='mb-2 text-gray-500 flex gap-2'>
                            <IoLocationOutline size={20} />
                            <span className='text-sm'>MetalVero market Lucknow, India 256320</span>
                        </li>
                        <li className='mb-2 text-gray-500 flex gap-2'>
                            <MdOutlinePhone size={20} />
                            <Link href="tel:+91-8569874589" className='hover:text-primary text-sm'>+91-8569874589</Link>
                        </li>
                        <li className='mb-2 text-gray-500 flex gap-2'>
                            <MdOutlineMail size={20} />
                            <Link href="mailto:support@metalvero.com" className='hover:text-primary text-sm'>support@metalvero.com</Link>
                        </li>

                    </ul>


                    <div className='flex gap-5 mt-5'>

                        <Link href="">
                            <AiOutlineYoutube className='text-primary' size={25} />
                        </Link>
                        <Link href="">
                            <FaInstagram className='text-primary' size={25} />
                        </Link>
                        <Link href="">
                            <FaWhatsapp className='text-primary' size={25} />
                        </Link>
                        <Link href="">
                            <TiSocialFacebookCircular className='text-primary' size={25} />
                        </Link>
                        <Link href="">
                            <FiTwitter className='text-primary' size={25} />
                        </Link>

                    </div>

                </div>

            </div>


            <div className='py-5 bg-gray-100' >
                <p className='text-center'>© 2026 MetalVero. All Rights Reserved.</p>
            </div>

        </footer>
    )
}

export default Footer
