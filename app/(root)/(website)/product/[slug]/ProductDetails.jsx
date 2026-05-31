'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { IoStar } from "react-icons/io5";
import { WEBSITE_CART, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import { decode, encode } from "entities";
import { HiMinus, HiPlus } from "react-icons/hi2";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { addIntoCart } from "@/store/reducer/cartReducer";
import { showToast } from "@/lib/showToast";
import { Button } from "@/components/ui/button";
import loadingSvg from '@/public/assets/images/loading.svg'
import ProductReveiw from "@/components/Application/Website/ProductReveiw";
import RelatedProducts from "@/components/Application/Website/RelatedProducts";
import BulkEnquiryForm from "@/components/Application/Website/BulkEnquiryForm";

const ProductDetails = ({ product, variant, reviewCount }) => {

    const dispatch = useDispatch()
    const cartStore = useSelector(store => store.cartStore)

    const [activeThumb, setActiveThumb] = useState()
    const [qty, setQty] = useState(1)
    const [isAddedIntoCart, setIsAddedIntoCart] = useState(false)
    const [isProductLoading, setIsProductLoading] = useState(false)

    useEffect(() => {
        setActiveThumb(variant?.media?.[0]?.secure_url)
    }, [variant])

    useEffect(() => {
        if (!variant || !variant._id) {
            setIsAddedIntoCart(false)
            setIsProductLoading(false)
            return
        }

        if (cartStore.count > 0) {
            const existingProduct = cartStore.products.findIndex((cartProduct) => cartProduct.productId === product._id && cartProduct.variantId === variant._id)

            if (existingProduct >= 0) {
                setIsAddedIntoCart(true)
            } else {
                setIsAddedIntoCart(false)
            }
        }
        setIsProductLoading(false)

    }, [variant, cartStore]) // Added cartStore to dependency to update when cart changes via other tabs or actions

    const isVariantAvailable = Boolean(variant && variant._id)

    const handleThumb = (thumbUrl) => {
        setActiveThumb(thumbUrl)
    }

    const handleQty = (actionType) => {
        if (actionType === 'inc') {
            setQty(prev => prev + 1)
        } else {
            if (qty !== 1) {
                setQty(prev => prev - 1)
            }
        }
    }


    const handleAddToCart = () => {
        if (!isVariantAvailable) {
            showToast('error', 'This product variant is not available. Please contact the admin.')
            return
        }

        const cartProduct = {
            productId: product._id,
            variantId: variant._id,
            name: product.name,
            url: product.slug,
            mrp: variant.mrp,
            sellingPrice: variant.sellingPrice,
            media: variant?.media?.[0]?.secure_url,
            qty: qty
        }

        dispatch(addIntoCart(cartProduct))
        setIsAddedIntoCart(true)
        showToast('success', 'Product added into cart.')
    }

    return (
        <div className="lg:px-32 px-4 bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans">

            {isProductLoading &&
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50">
                    <Image src={loadingSvg} width={80} height={80} alt="Loading" />
                </div>
            }

            <div className="py-6 border-b border-gray-100 dark:border-zinc-800 mb-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="hover:text-primary uppercase text-xs font-bold tracking-widest">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={WEBSITE_SHOP} className="hover:text-primary uppercase text-xs font-bold tracking-widest">Shop</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <span className="uppercase text-xs font-bold tracking-widest text-primary">{product?.name}</span>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="md:flex justify-between items-start lg:gap-12 gap-8 mb-20">
                {/* GALLERY SECTION */}
                <div className="md:w-1/2 lg:w-[55%] xl:flex xl:gap-6 md:sticky md:top-24">
                    <div className="xl:order-2 flex-grow mb-5 xl:mb-0">
                        <div className="relative aspect-square border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 overflow-hidden rounded-sm">
                            <Image
                                src={activeThumb || imgPlaceholder.src}
                                fill
                                alt="product"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="xl:order-1 flex xl:flex-col items-center gap-4 xl:w-24 overflow-auto xl:pb-0 pb-2 max-h-[600px] scrollbar-hide">
                        {variant?.media?.map((thumb) => (
                            <div
                                key={thumb._id}
                                className={`relative w-20 h-20 flex-shrink-0 cursor-pointer border-2 transition-all ${thumb.secure_url === activeThumb ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                                onClick={() => handleThumb(thumb.secure_url)}
                            >
                                <Image
                                    src={thumb?.secure_url || imgPlaceholder.src}
                                    fill
                                    alt="thumbnail"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* DETAILS SECTION */}
                <div className="md:w-1/2 lg:w-[45%] md:mt-0 mt-8">
                    <h1 className="text-4xl font-black uppercase mb-4 leading-tight">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-zinc-800">
                        <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <IoStar key={i} />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-500">({reviewCount} verified reviews)</span>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-3xl font-bold text-primary">
                                {variant.sellingPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                            </span>
                            <span className="text-xl text-gray-400 line-through mb-1">
                                {variant.mrp.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                            </span>
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-1">
                                -{variant.discountPercentage}%
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Inclusive of all taxes</p>
                    </div>

                    <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 mb-8" dangerouslySetInnerHTML={{ __html: decode(product.description) }}></div>

                    {/* ATTRIBUTES */}
                    <div className="space-y-6 mb-8">

                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex gap-4">
                            <div className="flex items-center h-14 border border-gray-300 dark:border-zinc-700 w-32 bg-white dark:bg-zinc-900">
                                <button type="button" className="h-full w-10 flex justify-center items-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleQty('desc')}>
                                    <HiMinus />
                                </button>
                                <input type="text" value={qty} className="flex-1 text-center bg-transparent border-none outline-none font-bold" readOnly />
                                <button type="button" className="h-full w-10 flex justify-center items-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => handleQty('inc')}>
                                    <HiPlus />
                                </button>
                            </div>

                            <div className="flex-1 flex gap-4">
                                {!isVariantAvailable ? (
                                    <Button className="w-full h-14 rounded-none uppercase tracking-widest font-bold" disabled type="button">Out of Stock</Button>
                                ) : (!isAddedIntoCart ? (
                                    <>
                                        <ButtonLoading
                                            type="button"
                                            text="Add To Cart"
                                            className="flex-1 h-14 rounded-none bg-black hover:bg-zinc-800 text-white uppercase tracking-widest font-bold text-sm"
                                            onClick={handleAddToCart}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1 h-14 rounded-none border-black hover:bg-gray-100 uppercase tracking-widest font-bold text-sm whitespace-nowrap"
                                            onClick={() => document.getElementById('bulk-enquiry').scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            Request Quote
                                        </Button>
                                    </>
                                ) : (
                                    <Button className="w-full h-14 rounded-none bg-green-600 hover:bg-green-700 text-white uppercase tracking-widest font-bold text-sm" asChild>
                                        <Link href={WEBSITE_CART}>Go To Cart</Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* BULK ENQUIRY FORM */}
                    <div id="bulk-enquiry">
                        <BulkEnquiryForm productName={product.name} productImage={activeThumb} />
                    </div>

                </div>
            </div>


            {/* TABS / REVIEWS / RELATED */}
            <div className="mb-20 space-y-20">
                <ProductReveiw productId={product._id} />

                <div className="border-t pt-10">
                    <h2 className="text-3xl font-black uppercase mb-8 text-center">You May Also Like</h2>
                    <RelatedProducts productId={product._id} />
                </div>
            </div>

        </div>
    )
}

export default ProductDetails