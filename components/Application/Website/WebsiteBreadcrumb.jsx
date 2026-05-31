import { WEBSITE_HOME } from '@/routes/WebsiteRoute'
import Link from 'next/link'
import React from 'react'

const WebsiteBreadcrumb = ({ props }) => {
    if (props.minimal) {
        return (
            <div className="flex items-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">
                <ul className='flex gap-2 items-center'>
                    <li><Link href={WEBSITE_HOME} className='hover:text-white transition-colors'>Home</Link></li>
                    {props.links.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <span className='text-zinc-600'>/</span>
                            {item.href ?
                                <Link href={item.href} className='hover:text-white transition-colors'>{item.label}</Link>
                                :
                                <span className="text-white">{item.label}</span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div className="py-10 flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
            <div>
                <h1 className='text-2xl font-semibold mb-2 text-center'>{props.title}</h1>
                <ul className='flex gap-2 justify-center'>
                    <li><Link href={WEBSITE_HOME} className='font-semibold'>Home</Link></li>
                    {props.links.map((item, index) => (
                        <li key={index}>
                            <span className='me-1'>/</span>
                            {item.href ?
                                <Link href={item.href}>{item.label}</Link>
                                :
                                <span>{item.label}</span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default WebsiteBreadcrumb
