'use client'
import React from 'react'
import useFetch from '@/hooks/useFetch'
import Image from 'next/image'
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import Link from 'next/link'
import { WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute'

const RelatedProducts = ({ productId }) => {
    const { data: relatedRes } = useFetch(`/api/product/related?productId=${productId}&limit=8`)
    const products = relatedRes?.data || []

    if (!products || products.length === 0) return <p className="text-sm text-gray-600">No related products found.</p>

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(p => (
                <Link key={p._id} href={WEBSITE_PRODUCT_DETAILS(p.slug)} className="border rounded p-2 flex flex-col gap-2">
                    <div className="w-full h-32 relative">
                        <Image src={p.media?.[0]?.secure_url || imgPlaceholder.src} alt={p.name} fill className="object-contain" />
                    </div>
                    <div className="text-sm font-medium truncate">{p.name}</div>
                    <div className="text-sm text-gray-600">{(p.sellingPrice || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
                </Link>
            ))}
        </div>
    )
}

export default RelatedProducts
