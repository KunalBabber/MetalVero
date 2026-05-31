import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import CustomRequestModel from "@/models/CustomRequest.model";
import OrderModel from "@/models/Order.model";
import ProductModel from "@/models/Product.model";
import ProductVariantModel from "@/models/ProductVariant.model";
import CategoryModel from "@/models/Category.model";

export async function POST(request, { params }) {
    try {
        await connectDB();
        const { id } = await request.json();

        const customRequest = await CustomRequestModel.findById(id);
        if (!customRequest) {
            return NextResponse.json({ success: false, message: "Request not found" }, { status: 404 });
        }

        // 1. Find or Create Placeholder Product
        let placeholderProduct = await ProductModel.findOne({ slug: 'custom-order-placeholder' });
        if (!placeholderProduct) {
            // Find or Create a Category for Custom Orders
            let customCategory = await CategoryModel.findOne({ slug: 'custom-orders' });
            if (!customCategory) {
                customCategory = await CategoryModel.create({
                    name: 'Custom Orders',
                    slug: 'custom-orders'
                });
            }

            placeholderProduct = await ProductModel.create({
                name: "Custom Manufacturing Order",
                slug: "custom-order-placeholder",
                description: "Placeholder for custom customRequests",
                category: customCategory._id,
                brand: "MetalVero Custom",
                mrp: 0,
                sellingPrice: 0,
                discountPercentage: 0,
                media: []
            });
        }

        // 2. Find or Create Placeholder Variant
        let placeholderVariant = await ProductVariantModel.findOne({ product: placeholderProduct._id });
        if (!placeholderVariant) {
            placeholderVariant = await ProductVariantModel.create({
                product: placeholderProduct._id,
                sku: "CUSTOM-001",
                mrp: 0,
                sellingPrice: 0,
                discountPercentage: 0,
                color: "Custom",
                size: "Custom",
                media: []
            });
        }

        // 3. Create Order
        const newOrder = await OrderModel.create({
            name: customRequest.name,
            email: customRequest.email,
            phone: customRequest.phone,
            country: 'India',
            state: 'Unknown',
            city: 'Unknown',
            pincode: '000000',
            landmark: 'N/A',
            products: [{
                productId: placeholderProduct._id,
                variantId: placeholderVariant._id,
                name: `Custom Order: ${customRequest.material} - ${customRequest.dimensions}`,
                qty: customRequest.quantity,
                mrp: 0,
                sellingPrice: 0
            }],
            subtotal: 0,
            discount: 0,
            couponDiscountAmount: 0,
            totalAmount: 0,
            status: 'pending',
            payment_id: `CUSTOM-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
            order_id: `ORD-CUST-${Math.floor(Math.random() * 100000)}`,
            ordernote: customRequest.description
        });

        // 4. Update Request Status
        customRequest.status = 'Converted';
        await customRequest.save();

        return NextResponse.json({ success: true, message: "Order created successfully", orderId: newOrder._id }, { status: 200 });

    } catch (error) {
        console.error("Conversion Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
