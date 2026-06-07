import React from 'react'
import Link from 'next/link'
import { FaHotel, FaBuilding, FaHandshake, FaTruck, FaUtensils } from 'react-icons/fa'
import Image from 'next/image'
import factoryShowcase from '@/public/assets/images/factory-showcase.jpg'
import imgHotels from '@/public/assets/images/b2b_hotels.png'
import imgRestaurants from '@/public/assets/images/b2b_restaurants.png'
import imgOffices from '@/public/assets/images/b2b_offices.png'
import imgMeeting from '@/public/assets/images/b2b_meeting.png'
import imgCorporateOffice from '@/public/assets/images/b2b_corporate_office.png'

const B2BSolutions = () => {
    return (
        <div className='bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100'>
            {/* HERO */}
            <section className="relative h-[50vh] flex items-center justify-center bg-zinc-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div
                    className="absolute inset-0 z-0 opacity-50"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Corporate & Wholesale</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tighter">
                        B2B <span className="text-primary">Partnership</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Transforming spaces with industrial-grade furniture for hotels, restaurants, offices, and retail chains.
                    </p>
                </div>
            </section>

            {/* SECTORS */}
            <section className="py-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black uppercase mb-4">Industries We Serve</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            We provide tailored furniture solutions for a wide range of commercial sectors, ensuring durability and style scale with your business.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: FaHotel, title: "Hotels & Hospitality", desc: "Durable bed frames, luggage racks, and lobby seating designed for heavy traffic.", img: imgHotels },
                            { icon: FaUtensils, title: "Restaurants & Cafes", desc: "Industrial dining tables, bar stools, and outdoor furniture that sets that vibe.", img: imgRestaurants },
                            { icon: FaBuilding, title: "Offices & Coworking", desc: "Modern workstations, conference tables, and shelving units for productive spaces.", img: imgOffices }
                        ].map((item, idx) => (
                            <div key={idx} className="group border border-gray-100 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-xl transition-all">
                                <div className="relative h-60 w-full">
                                    <Image src={item.img} fill alt={item.title} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <item.icon className="text-5xl text-white opacity-80" />
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-bold uppercase mb-3">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY PARTNER */}
            <section className="py-20 px-4 md:px-12 bg-gray-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black uppercase mb-6">Why Partner With Us?</h2>
                        <ul className="space-y-6">
                            {[
                                { title: "Direct Factory Pricing", text: "Eliminate middlemen and get the best rates for bulk orders." },
                                { title: "Custom Fabrication", text: "We modify designs to fit your brand aesthetics and space requirements." },
                                { title: "Priority Production", text: "Dedicated assembly lines for large-scale B2B orders to meet deadlines." },
                                { title: "Global Shipping", text: "Secure packaging and logistics partners for domestic and international delivery." }
                            ].map((point, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                                        <FaHandshake size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg uppercase">{point.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{point.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10">
                            <Link href="/custom-order" className="inline-flex w-full sm:w-auto text-center justify-center bg-primary text-white hover:bg-black font-bold py-3 sm:py-4 px-6 sm:px-10 text-sm sm:text-base uppercase tracking-widest transition-all">
                                Request Corporate Catalog
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Image src={imgMeeting} width={400} height={300} alt="Meeting" className="rounded-lg object-cover h-full" />
                        <Image src={imgCorporateOffice} width={400} height={300} alt="Office" className="rounded-lg object-cover h-full mt-8" />
                    </div>
                </div>
            </section>
        </div>
    )
}



export default B2BSolutions
