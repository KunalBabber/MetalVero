import React from 'react'
import ProductDetails from './ProductDetails'
import { connectDB } from "@/lib/databaseConnection";
import ProductModel from "@/models/Product.model";
import MediaModel from "@/models/Media.model";
import ProductVariantModel from "@/models/ProductVariant.model";
import ReviewModel from "@/models/Review.model";

const ProductPage = async ({ params, searchParams }) => {
    const { slug } = await params

    let productData = null;

    try {
        await connectDB()

        const filter = { deletedAt: null, slug: slug }

        // get product 
        const getProduct = await ProductModel.findOne(filter).populate('media', 'secure_url').lean()

        if (getProduct) {
            const variantFilter = { product: getProduct._id }

            let variant = await ProductVariantModel.findOne(variantFilter).populate('media', 'secure_url').lean()

            if (!variant) {
                // Fallback: try to find any available variant for this product
                variant = await ProductVariantModel.findOne({ product: getProduct._id }).populate('media', 'secure_url').lean()
            }

            if (!variant) {
                variant = {
                    _id: null,
                    product: getProduct._id,
                    mrp: getProduct.mrp,
                    sellingPrice: getProduct.sellingPrice,
                    discountPercentage: getProduct.discountPercentage,
                    sku: String(getProduct._id),
                    media: getProduct.media || [],
                }
            }

            // get review  
            const review = await ReviewModel.countDocuments({ product: getProduct._id })

            productData = {
                product: JSON.parse(JSON.stringify(getProduct)),
                variant: JSON.parse(JSON.stringify(variant)),
                reviewCount: review
            }
        }

    } catch (error) {
        console.error("Error fetching product details:", error);
    }

    if (!productData) {
        return (
            <div className='flex justify-center items-center py-10 h-[300px]'>
                <h1 className='text-4xl font-semibold'>Data not found.</h1>
            </div>
        )
    } else {
        return (
            <ProductDetails
                product={productData.product}
                variant={productData.variant}
                reviewCount={productData.reviewCount}
            />
        )
    }
}

export default ProductPage