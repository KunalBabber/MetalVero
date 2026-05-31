'use client'
import Filter from '@/components/Application/Website/Filter'
import Sorting from '@/components/Application/Website/Sorting'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import useWindowSize from '@/hooks/useWindowSize'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import ProductBox from '@/components/Application/Website/ProductBox'
import ButtonLoading from '@/components/Application/ButtonLoading'
const breadcrumb = {
    title: 'Shop',
    minimal: true,
    links: [
        { label: 'Shop', href: WEBSITE_SHOP }
    ]
}
const Shop = () => {
    const searchParams = useSearchParams().toString()
    const [limit, setLimit] = useState(9)
    const [sorting, setSorting] = useState('default_sorting')
    const [isMobileFilter, setIsMobileFilter] = useState(false)
    const windowSize = useWindowSize()


    const fetchProduct = async (pageParam) => {
        const { data: getProduct } = await axios.get(`/api/shop?page=${pageParam}&limit=${limit}&sort=${sorting}&${searchParams}`)

        if (!getProduct.success) {
            return
        }

        return getProduct.data
    }

    const { error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['products', limit, sorting, searchParams],
        queryFn: async ({ pageParam }) => await fetchProduct(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage
        }
    })


    return (
        <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">
            {/* Shop Header Banner */}
            <div className="relative bg-zinc-900 text-white py-16 px-4 md:px-12 border-b-4 border-primary overflow-hidden">
                 <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                 <div className="relative z-10 max-w-7xl mx-auto">
                     <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter shadow-sm mb-4">Our <span className="text-primary">Products</span></h1>
                     <p className="text-gray-300 max-w-2xl text-lg font-light mb-6 border-l-2 border-primary pl-4">Browse our collection of heavy-duty industrial furniture and custom metalwork.</p>
                     <div className="bg-black/50 inline-block p-2 rounded">
                        <WebsiteBreadcrumb props={breadcrumb} />
                     </div>
                 </div>
            </div>

            <section className='max-w-7xl mx-auto lg:flex px-4 md:px-12 py-12'>
                {windowSize.width > 1024 ?

                    <div className='w-72 me-4'>
                        <div className='sticky top-0 bg-gray-50 p-4 rounded'>
                            <Filter />
                        </div>
                    </div>
                    :

                    <Sheet open={isMobileFilter} onOpenChange={() => setIsMobileFilter(false)}>
                        <SheetContent side='left' className="block">
                            <SheetHeader className="border-b">
                                <SheetTitle>Filter </SheetTitle>
                            </SheetHeader>
                            <div className='p-4 overflow-auto h-[calc(100vh-80px)]'>
                                <Filter />
                            </div>
                        </SheetContent>
                    </Sheet>

                }


                <div className='lg:w-[calc(100%-18rem)]'>
                    <Sorting
                        limit={limit}
                        setLimit={setLimit}
                        sorting={sorting}
                        setSorting={setSorting}
                        mobileFilterOpen={isMobileFilter}
                        setMobileFilterOpen={setIsMobileFilter}
                    />

                    {isFetching && <div className='p-3 font-semibold text-center'>Loading...</div>}
                    {error && <div className='p-3 font-semibold text-center'>{error.message}</div>}

                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-10 gap-5 mt-10'>
                        {data && data.pages.map(page => (
                            page.products.map(product => (
                                <ProductBox key={product._id} product={product} />
                            ))
                        ))}
                    </div>

                    {/* load more button  */}

                    <div className='flex justify-center mt-10'>
                        {hasNextPage ?
                            <ButtonLoading type="button" loading={isFetching} text="Load More" onClick={fetchNextPage} />
                            :
                            <>
                                {!isFetching && <span>No more data to load.</span>}
                            </>
                        }
                    </div>

                </div>


            </section>
        </div>
    )
}

export default Shop
