'use client'
import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import ButtonLoading from '../ButtonLoading'
import { useRouter, useSearchParams } from 'next/navigation'
import { WEBSITE_HOME, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Filter = () => {
    const searchParams = useSearchParams()

    const [priceFilter, setPriceFilter] = useState({ minPrice: 0, maxPrice: 3000 })
    const [selectedCategory, setSelectedCategory] = useState([])

    const { data: categoryData } = useFetch('/api/category/get-category')

    const urlSearchParams = new URLSearchParams(searchParams.toString())
    const router = useRouter()

    useEffect(() => {
        searchParams.get('category') ? setSelectedCategory(searchParams.get('category').split(',')) : setSelectedCategory([])
    }, [searchParams])

    const handlePriceChange = (value) => {
        setPriceFilter({ minPrice: value[0], maxPrice: value[1] })
    }

    const handleCategoryFilter = (categorySlug) => {
        let newSelectedCategory = [...selectedCategory]
        if (newSelectedCategory.includes(categorySlug)) {
            newSelectedCategory = newSelectedCategory.filter(cat => cat !== categorySlug)
        } else {
            newSelectedCategory.push(categorySlug)
        }

        setSelectedCategory(newSelectedCategory)

        newSelectedCategory.length > 0 ? urlSearchParams.set('category', newSelectedCategory.join(',')) : urlSearchParams.delete('category')

        router.push(`${WEBSITE_SHOP}?${urlSearchParams}`, { scroll: false })
    }

    const handlePriceFilter = () => {
        urlSearchParams.set('minPrice', priceFilter.minPrice)
        urlSearchParams.set('maxPrice', priceFilter.maxPrice)
        router.push(`${WEBSITE_SHOP}?${urlSearchParams}`, { scroll: false })
    }

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-sm shadow-sm">
            {searchParams.size > 0 &&
                <Button type="button" variant="destructive" className="w-full mb-4 uppercase tracking-wider font-bold rounded-sm" asChild>
                    <Link href={WEBSITE_SHOP}>
                        Clear Filter
                    </Link>
                </Button>
            }
            <Accordion type="multiple" defaultValue={['1', '2']}>
                <AccordionItem value="1" className="border-b border-zinc-200 dark:border-zinc-800">
                    <AccordionTrigger className="uppercase font-bold tracking-wider hover:no-underline text-zinc-900 dark:text-zinc-100">Category</AccordionTrigger>
                    <AccordionContent>
                        <div className='max-h-48 overflow-auto custom-scrollbar'>
                            <ul className="space-y-3 pt-2">
                                {categoryData && categoryData.success && categoryData.data.map((category) => (
                                    <li key={category._id} className='mb-1'>
                                        <label className="flex items-center space-x-3 cursor-pointer group">
                                            <Checkbox
                                                onCheckedChange={() => handleCategoryFilter(category.slug)}
                                                checked={selectedCategory.includes(category.slug)}
                                                className="border-zinc-400 group-hover:border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                            />
                                            <span className="text-zinc-700 dark:text-zinc-300 group-hover:text-primary transition-colors">{category.name}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="2" className="border-none">
                    <AccordionTrigger className="uppercase font-bold tracking-wider hover:no-underline text-zinc-900 dark:text-zinc-100">Price</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-4 px-2">
                            <Slider defaultValue={[0, 3000]} max={3000} step={1} onValueChange={handlePriceChange} className="py-4" />
                            <div className='flex justify-between items-center pt-2 font-mono text-sm text-zinc-600 dark:text-zinc-400'>
                                <span>{priceFilter.minPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                                <span>{priceFilter.maxPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                            </div>

                            <div className='mt-6'>
                                <ButtonLoading onClick={handlePriceFilter} type="button" text="Filter Price" className="w-full uppercase tracking-wider font-bold rounded-sm bg-primary text-white hover:bg-black" />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Filter
