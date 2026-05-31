import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import ContactModel from "@/models/Contact.model";
import { sendMail } from "@/lib/sendMail";

export async function POST(request) {
    try {
        await connectDB();
        const { contactId, email, subject, message } = await request.json();

        if (!contactId || !email || !message) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const mailBody = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h2 style="color: #f97316; text-transform: uppercase;">MetalVero Team Response</h2>
                <p>Hello,</p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                <p style="font-size: 12px; color: #6b7280;">This is a reply to your message on our Contact Us page.</p>
                <p style="font-size: 12px; color: #6b7280;">C-51, 2nd Phase, Near Union Dharamkata, Adityapur Industrial Area, Jamshedpur, Jharkhand 832109</p>
            </div>
        `;

        const mailResult = await sendMail(subject || "Reply from MetalVero", email, mailBody);

        if (!mailResult.success) {
            return NextResponse.json({ success: false, message: "Error sending email" }, { status: 500 });
        }

        await ContactModel.findByIdAndUpdate(contactId, { status: 'Contacted' });

        return NextResponse.json({ success: true, message: "Reply sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Contact Reply Error:", error);
        return NextResponse.json({ success: false, message: "Error processing reply" }, { status: 500 });
    }
}
