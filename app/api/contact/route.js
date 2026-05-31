import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import ContactModel from "@/models/Contact.model";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        const contact = await ContactModel.create(body);

        return NextResponse.json({ success: true, message: "Message sent successfully", data: contact }, { status: 201 });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ success: false, message: "Error sending message" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const messages = await ContactModel.find({ deletedAt: null }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: messages }, { status: 200 });
    } catch (error) {
        console.error("Contact Fetch Error:", error);
        return NextResponse.json({ success: false, message: "Error fetching messages" }, { status: 500 });
    }
}
