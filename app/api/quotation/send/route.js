import { NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";
import { quotationNotification } from "@/email/quotationNotification";
import { isAuthenticated } from "@/lib/authentication";

export async function POST(request) {
    try {
        const auth = await isAuthenticated('admin');
        if (!auth.isAuth) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }

        const body = await request.json();
        const { email, name, productName, price, message } = body;

        if (!email || !price) {
            return NextResponse.json({ success: false, message: "Email and price are required" }, { status: 400 });
        }

        const mailBody = quotationNotification({ name, productName, price, message });
        const mailResult = await sendMail(
            `Quotation for ${productName || 'Custom Request'} - MetalVero`,
            email,
            mailBody
        );

        if (!mailResult) {
            return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Quotation sent successfully via email!" 
        });

    } catch (error) {
        console.error("Quotation API Error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
