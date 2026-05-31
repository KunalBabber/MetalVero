import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import EnquiryModel from "@/models/Enquiry.model";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        await connectDB();
        
        // Force refresh model if new field is missing due to Next.js hot-reload caching
        if (mongoose.models.Enquiry && !mongoose.models.Enquiry.schema.paths.productImage) {
            delete mongoose.models.Enquiry;
        }
        
        const body = await request.json();

        // Fallbacks for optional fields to prevent validation errors with old model cache
        if (!body.productName) body.productName = "General Inquiry";
        if (!body.quantity) body.quantity = "N/A";

        const enquiry = await EnquiryModel.create(body);

        return NextResponse.json({ success: true, message: "Enquiry received", data: enquiry }, { status: 201 });
    } catch (error) {
        console.error("Enquiry API Error:", error);
        return NextResponse.json({ success: false, message: "Error processing enquiry" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const enquiries = await EnquiryModel.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: enquiries }, { status: 200 });
    } catch (error) {
        console.error("Enquiry Fetch Error:", error);
        return NextResponse.json({ success: false, message: "Error fetching enquiries" }, { status: 500 });
    }
}
