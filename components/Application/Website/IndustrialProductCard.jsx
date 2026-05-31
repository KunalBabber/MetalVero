import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute';
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp';

const IndustrialProductCard = ({ product }) => {
    return (
        <div className="group border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all hover:shadow-xl hover:border-primary">
            <Link href={WEBSITE_PRODUCT_DETAILS(product.slug)} className="block relative">
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
                    <Image
                        src={product?.media[0]?.secure_url || imgPlaceholder.src}
                        alt={product?.media[0]?.alt || product?.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.discountPercentage > 0 && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                            -{product.discountPercentage}%
                        </span>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate font-sans">
                        {product?.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 min-h-[40px]">
                        {product?.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 line-through">
                                {product?.mrp.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                            </span>
                            <span className="text-xl font-bold text-primary">
                                {product?.sellingPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                            </span>
                        </div>
                        <button className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-primary dark:hover:bg-primary hover:text-white transition-colors">
                            View
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default IndustrialProductCard;
