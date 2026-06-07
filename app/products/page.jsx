import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

const Products = () => {
    const categories = [
        {
            name: 'Iron Furniture',
            desc: "Heavy-duty iron tables, chairs, and shelves built for industrial and vintage aesthetics.",
            image: '/assets/images/cat_iron_furniture.png',
            link: '/shop?category=iron'
        },
        {
            name: 'Steel Furniture',
            desc: "Sleek stainless steel designs perfect for modern homes, offices, and medical facilities.",
            image: '/assets/images/cat_steel_furniture.png',
            link: '/shop?category=steel'
        },
        {
            name: 'Custom Metal',
            desc: "Bespoke fabrication services for gates, railings, and unique architectural elements.",
            image: '/assets/images/cat_custom_metal.png',
            link: '/custom-orders'
        },
    ];

    return (
        <div className='bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100'>
            <section className="py-20 px-4 text-center bg-gray-50 dark:bg-zinc-900">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Catalog</span>
                <h1 className='text-4xl md:text-5xl font-black uppercase mt-2'>Manufacturing Capabilities</h1>
                <p className='text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto'>
                    Explore our range of standard production items and custom fabrication services.
                </p>
            </section>

            <section className="py-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="group border border-gray-100 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-xl transition-all">
                            <div className="relative h-64 bg-gray-200">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold uppercase mb-3">{cat.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[50px]">{cat.desc}</p>
                                <Link href={cat.link} className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-primary hover:text-black dark:hover:text-white transition-colors">
                                    View Catalog <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-4 bg-zinc-900 text-white text-center">
                <h2 className="text-3xl font-black uppercase mb-6">Bulk Production?</h2>
                <p className="max-w-xl mx-auto text-gray-400 mb-8">
                    We offer exclusive pricing and priority manufacturing for B2B orders exceeding 50 units.
                </p>
                <Link href="/b2b-solutions" className="bg-white text-black hover:bg-gray-200 font-bold py-4 px-10 uppercase tracking-widest transition-all">
                    Visit B2B Section
                </Link>
            </section>
        </div>
    )
}

export default Products
