import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaIndustry, FaTools, FaAward, FaUsers } from 'react-icons/fa'
import factoryShowcase from '@/public/assets/images/factory-showcase.jpg'

const AboutFactory = () => {
    return (
        <div className="bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100">
            {/* HER0 */}
            <section className="relative h-[60vh] flex items-center justify-center bg-zinc-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div
                    className="absolute inset-0 z-0 opacity-50"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1565610222536-ef125c5975e3?q=80&w=2070&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Since 1995</span>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
                        The <span className="text-primary">Factory</span> Profile
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        A legacy of strength, precision, and craftsmanship in every weld.
                    </p>
                </div>
            </section>

            {/* INTRO & STATS */}
            <section className="py-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black uppercase mb-6">Built on Steel</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            We are a premier manufacturing facility specializing in high-grade Iron and Steel furniture.
                            Our journey began with a simple mission: to create durable, functional, and aesthetically pleasing metal products for both commercial and residential use.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Today, we operate a fully equipped 50,000 sq. ft. facility capable of handling bulk production orders, custom fabrication, and complex metalworks.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-4xl font-black text-primary mb-2">25+</h3>
                                <p className="font-bold uppercase tracking-wide text-sm">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-primary mb-2">50k</h3>
                                <p className="font-bold uppercase tracking-wide text-sm">Sq. Ft. Facility</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-primary mb-2">10k+</h3>
                                <p className="font-bold uppercase tracking-wide text-sm">Projects Delivered</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-primary mb-2">100%</h3>
                                <p className="font-bold uppercase tracking-wide text-sm">Quality Guaranteed</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[600px] border-4 border-zinc-100 dark:border-zinc-800 rounded-lg overflow-hidden">


                        <Image
                            src={factoryShowcase}
                            fill
                            alt="Factory Interior"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* MACHINERY & CAPABILITIES */}
            <section className="py-20 px-4 md:px-12 bg-gray-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Infrastructure</span>
                    <h2 className="text-4xl font-black uppercase mt-2">Machinery & Capabilities</h2>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                    {[
                        { icon: FaIndustry, title: "CNC Laser Cutting", desc: "Precision cutting for complex intricate designs." },
                        { icon: FaTools, title: "MIG/TIG Welding", desc: "High-strength certified welding stations." },
                        { icon: FaIndustry, title: "Powder Coating", desc: "Automated line for durable, premium finishes." },
                        { icon: FaUsers, title: "Assembly Line", desc: "Dedicated team for rapid assembly and QC." }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-black p-8 border border-gray-100 dark:border-zinc-800 hover:border-primary transition-colors group text-center">
                            <item.icon className="text-5xl text-gray-300 group-hover:text-primary transition-colors mx-auto mb-6" />
                            <h3 className="text-xl font-bold uppercase mb-3">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CERTIFICATIONS */}
            <section className="py-20 px-4 md:px-12 border-t border-gray-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-black uppercase mb-4">Certified Excellence</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            We adhere to strict quality control standards. Our facility is ISO 9001:2015 certified, ensuring consistent quality in every product that leaves our factory.
                        </p>
                        <Link href="/contact-us" className="text-primary font-bold uppercase tracking-wider underline hover:text-black dark:hover:text-white">
                            View Compliance Documents
                        </Link>
                    </div>
                    <div className="md:w-1/2 flex gap-6 justify-center md:justify-end">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-gray-400">ISO</div>
                        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-gray-400">GMP</div>
                        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-gray-400">ISI</div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutFactory
