import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/databaseConnection';
import CategoryModel from '@/models/Category.model';
import MediaModel from '@/models/Media.model';
import ProductModel from '@/models/Product.model';
import ProductVariantModel from '@/models/ProductVariant.model';
import { faker } from '@faker-js/faker';

export async function GET() {
    try {
        await connectDB();

        // Optional: Clear existing data for a fresh seed
        // await ProductModel.deleteMany({});
        // await ProductVariantModel.deleteMany({});
        // await CategoryModel.deleteMany({});
        // await MediaModel.deleteMany({});

        // Create Categories
        const categoriesData = [
            { name: 'Iron Furniture', slug: 'iron-furniture' },
            { name: 'Steel Furniture', slug: 'steel-furniture' },
            { name: 'Wood & Metal', slug: 'wood-metal' },
            { name: 'Industrial Shelving', slug: 'industrial-shelving' },
            { name: 'Custom Fabrication', slug: 'custom-fabrication' },
        ];

        let categories = [];
        for (let cat of categoriesData) {
            let existingCat = await CategoryModel.findOne({ slug: cat.slug });
            if (!existingCat) {
                existingCat = await CategoryModel.create(cat);
            }
            categories.push(existingCat);
        }

        // Create Media (Unsplash Images for Manufacturing/Industrial look)
        const industrialImages = [
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91',
            'https://images.unsplash.com/photo-1533090161767-e6ffed986c88',
            'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17',
            'https://images.unsplash.com/photo-1567784177951-6fa58317e16b',
            'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789',
        ];

        let medias = [];
        for (let i = 0; i < industrialImages.length; i++) {
            const asset_id = `seed_asset_${i + 1}`;
            let existingMedia = await MediaModel.findOne({ asset_id });
            if (!existingMedia) {
                existingMedia = await MediaModel.create({
                    asset_id,
                    public_id: `seed_public_${i + 1}`,
                    path: `${industrialImages[i]}?q=80&w=800&auto=format&fit=crop`,
                    thumbnail_url: `${industrialImages[i]}?q=80&w=200&auto=format&fit=crop`,
                    secure_url: `${industrialImages[i]}?q=80&w=800&auto=format&fit=crop`,
                    alt: `Industrial Image ${i + 1}`,
                    title: `Industrial Image ${i + 1}`
                });
            }
            medias.push(existingMedia);
        }

        const productNames = [
            'Industrial Heavy Duty Worktable',
            'Forged Iron Dining Set',
            'Steel Frame Reclaimed Wood Desk',
            'Modular Industrial Shelving Unit',
            'Custom Welded Metal Cabinet',
            'Galvanized Steel Tool Rack',
            'Iron Pipe Bookshelf',
            'Industrial Pendant Lighting Fixture',
            'Cast Iron Factory Stool',
            'Steel Mesh Storage Bin',
            'Metal Frame Wall Mirror',
            'Industrial Rolling Bar Cart',
            'Custom Iron Stair Railing Section',
            'Steel Fire Pit Ring',
            'Metal Industrial Planter Box'
        ];

        const insertedProducts = [];
        const insertedVariants = [];

        for (let i = 0; i < productNames.length; i++) {
            const mrp = faker.number.int({ min: 500, max: 2000 });
            const sellingPrice = Math.floor(mrp * 0.85);
            
            const product = await ProductModel.create({
                name: productNames[i],
                slug: faker.helpers.slugify(productNames[i]).toLowerCase() + '-' + Date.now() + i,
                category: faker.helpers.arrayElement(categories)._id,
                mrp,
                sellingPrice,
                discountPercentage: 15,
                media: [faker.helpers.arrayElement(medias)._id],
                description: `<p>${faker.commerce.productDescription()}</p><p>Handcrafted with premium materials and industrial precision.</p>`
            });

            insertedProducts.push(product);

            // Create 2-3 variants for each product
            const variantCount = faker.number.int({ min: 2, max: 3 });
            for (let j = 0; j < variantCount; j++) {
                const variantMrp = mrp + (j * 100);
                const variantSellingPrice = Math.floor(variantMrp * 0.9);
                
                const variant = await ProductVariantModel.create({
                    product: product._id,
                    mrp: variantMrp,
                    sellingPrice: variantSellingPrice,
                    discountPercentage: 10,
                    sku: `SKU-${product.name.substring(0, 3).toUpperCase()}-${i}-${j}-${faker.string.alphanumeric(4)}`,
                    media: [faker.helpers.arrayElement(medias)._id]
                });
                insertedVariants.push(variant);
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: "Successfully seeded the database with 15 products and variants!",
            productsAdded: insertedProducts.length,
            variantsAdded: insertedVariants.length,
            products: insertedProducts
        });
    } catch (error) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
