import Footer from '@/components/Application/Website/Footer'
import Header from '@/components/Application/Website/Header'
import ChatWidget from '@/components/Application/Website/ChatWidget'
import WhatsAppButton from '@/components/Application/Website/WhatsAppButton'
// Hardcode or ensure this is set if client components use it
// But for now, fixing server side is enough.
import React from 'react'
import { Kumbh_Sans } from 'next/font/google'

const kumbh = Kumbh_Sans({
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
    subsets: ['latin']
})

const layout = ({ children }) => {
    return (
        <div className={kumbh.className}>
            <Header />
            <main>
                {children}
            </main>
            <WhatsAppButton />
            <ChatWidget />
            <Footer />
        </div>
    )
}

export default layout
