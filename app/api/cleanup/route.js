import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/databaseConnection';
import ProductModel from '@/models/Product.model';
import CategoryModel from '@/models/Category.model';

export async function GET() {
    try {
        await connectDB();

        // 1. Delete clothing-related categories (e.g. Men's, Women's, Kids)
        const categoryFilter = {
            $or: [
                { name: { $regex: "men", $options: 'i' } },
                { name: { $regex: "women", $options: 'i' } },
                { name: { $regex: "kid", $options: 'i' } },
                { name: { $regex: "cloth", $options: 'i' } }
            ]
        };

        const categoriesToDelete = await CategoryModel.find(categoryFilter);
        const categoryIdsToDelete = categoriesToDelete.map(cat => cat._id);

        const categoryDeleteResult = await CategoryModel.deleteMany({ _id: { $in: categoryIdsToDelete } });

        // 2. Delete matching products
        const filter = {
            $or: [
                { category: { $in: categoryIdsToDelete } },
                { name: { $regex: 'shirt', $options: 'i' } },
                { name: { $regex: 'jeans', $options: 'i' } },
                { name: { $regex: 'clothing', $options: 'i' } },
                { name: { $regex: 'apparel', $options: 'i' } },
                { name: { $regex: 'men', $options: 'i' } },
                { sellingPrice: 0 },
                { sellingPrice: null },
                { mrp: 0 },
                { mrp: null }
            ]
        };

        // Delete the matching products completely from the database
        const result = await ProductModel.deleteMany(filter);
        
        return NextResponse.json({ 
            success: true, 
            message: "Successfully removed Men's categories, old clothing products, and 0 amount products.",
            productsDeleted: result.deletedCount,
            categoriesDeleted: categoryDeleteResult.deletedCount
        });
    } catch (error) {
        console.error("Cleanup Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
