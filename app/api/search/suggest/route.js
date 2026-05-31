import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
import Fuse from 'fuse.js';

export async function GET(request) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const q = searchParams.get('q') || '';
        const limit = parseInt(searchParams.get('limit')) || 6;

        if (!q) return response(true, 200, 'No query', { suggestions: [] });

        const matchStage = {
            deletedAt: null,
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { slug: { $regex: q, $options: 'i' } },
                { metaTitle: { $regex: q, $options: 'i' } },
                { 'variants.color': { $regex: q, $options: 'i' } },
                { 'variants.size': { $regex: q, $options: 'i' } },
            ]
        };

        const suggestions = await ProductModel.aggregate([
            {
                $lookup: {
                    from: 'productvariants',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'variants'
                }
            },
            { $match: matchStage },
            {
                $lookup: {
                    from: 'medias',
                    localField: 'media',
                    foreignField: '_id',
                    as: 'media'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    sellingPrice: 1,
                    media: { _id: 1, secure_url: 1, alt: 1 },
                    variants: { color: 1, size: 1 }
                }
            },
            { $limit: limit }
        ]);

        // if aggregation returned no suggestions, try a lightweight fuzzy fallback using Fuse.js
        if (suggestions.length === 0) {
            // load a reasonable sample set for fuzzy matching
            const sample = await ProductModel.find({ deletedAt: null }).lean().select('name slug media').limit(500);
            if (sample && sample.length > 0) {
                const fuse = new Fuse(sample, { keys: ['name', 'slug'], threshold: 0.45 });
                const fuseRes = fuse.search(q, { limit });
                const fuzzySuggestions = fuseRes.map(r => r.item).slice(0, limit);
                if (fuzzySuggestions.length > 0) {
                    return response(true, 200, 'Suggestions (fuzzy) found', { suggestions: fuzzySuggestions });
                }
            }
            return response(true, 200, 'No suggestions', { suggestions: [] });
        }

        return response(true, 200, 'Suggestions found', { suggestions });

    } catch (error) {
        return catchError(error);
    }

}
