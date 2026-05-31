import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import CustomRequestModel from "@/models/CustomRequest.model";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        const customRequest = await CustomRequestModel.create(body);

        return NextResponse.json({ success: true, message: "Request received", data: customRequest }, { status: 201 });
    } catch (error) {
        console.error("Custom Request API Error:", error);
        return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const requests = await CustomRequestModel.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: requests }, { status: 200 });
    } catch (error) {
        console.error("Custom Request Fetch Error:", error);
        return NextResponse.json({ success: false, message: "Error fetching requests" }, { status: 500 });
    }
}
