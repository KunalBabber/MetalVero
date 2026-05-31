import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/databaseConnection'
import ProductModel from '@/models/Product.model'
import { catchError } from '@/lib/helperFunction'

function tokenizeName(name = '') {
    return name.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).slice(0, 5)
}

export async function GET(request) {
    try {
        await connectDB()
        const productId = request.nextUrl.searchParams.get('productId')
        const limit = parseInt(request.nextUrl.searchParams.get('limit') || '8', 10)

        if (!productId) {
            return NextResponse.json({ success: false, message: 'Missing productId' }, { status: 400 })
        }

        const product = await ProductModel.findById(productId).lean()
        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 })
        }

        const category = product.category
        let related = []

        // First try same category
        if (category) {
            related = await ProductModel.find({ category, deletedAt: null, _id: { $ne: product._id } })
                .select('name slug mrp sellingPrice discountPercentage media')
                .limit(limit)
                .populate({ path: 'media', select: 'secure_url' })
                .lean()
        }

        // If not enough results, fallback to name-based similarity
        if ((!related || related.length < limit) && product.name) {
            const tokens = tokenizeName(product.name)
            const nameQuery = tokens.map(t => ({ name: { $regex: t, $options: 'i' } }))
            const need = limit - (related ? related.length : 0)
            const nameRelated = await ProductModel.find({ $and: [{ _id: { $ne: product._id } }, { deletedAt: null }, { $or: nameQuery }] })
                .select('name slug mrp sellingPrice discountPercentage media')
                .limit(need)
                .populate({ path: 'media', select: 'secure_url' })
                .lean()

            // merge unique
            const map = new Map(related.map(r => [String(r._id), r]))
            for (const nr of nameRelated) {
                if (!map.has(String(nr._id))) map.set(String(nr._id), nr)
            }
            related = Array.from(map.values()).slice(0, limit)
        }

        return NextResponse.json({ success: true, data: related })
    } catch (error) {
        return catchError(error)
    }
}
