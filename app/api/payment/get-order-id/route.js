import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import Razorpay from "razorpay";

export async function POST(request) {
    try {
        await connectDB()
        const payload = await request.json()
        const schema = zSchema.pick({
            amount: true
        })

        const validate = schema.safeParse(payload)

        if (!validate.success) {
            return response(false, 400, 'Invalid or missing fields.', validate.error)
        }

        const { amount } = validate.data

        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return response(false, 500, 'Payment gateway not configured. Ask admin to set Razorpay keys.')
        }

        const razInstance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })


        const razOption = {
            amount: Number(amount) * 100,
            currency: 'INR'
        }

        let orderDetail
        try {
            orderDetail = await razInstance.orders.create(razOption)
        } catch (err) {
            // Log full error server-side for diagnostics, but return a concise message to clients
            console.error('Razorpay order creation error:', err)
            const desc = err?.error?.description || err?.error?.message || err?.message || 'Authentication failed'
            return response(false, 500, `Payment gateway error: ${desc}`)
        }

        const order_id = orderDetail.id

        return response(true, 200, 'Order id generated.', order_id)

    } catch (error) {
        // Normalize Razorpay / SDK errors to return a helpful message
        const message = error?.error?.description || error?.error?.message || error?.message || 'Failed to generate order id.'
        return response(false, 500, message)
    }
}
