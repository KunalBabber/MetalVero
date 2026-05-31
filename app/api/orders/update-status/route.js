import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/Order.model";

export async function PUT(request) {
    try {

        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized.')
        }

        await connectDB()
        const { _id, status } = await request.json()

        if (!_id || !status) {
            return response(false, 400, 'Order id and status are required.')
        }

        const orderData = await OrderModel.findById(_id)

        if (!orderData) {
            return response(false, 404, 'Order not found.')
        }

        orderData.status = status
        await orderData.save()

        // If order is delivered, send invoice email
        if (status === 'delivered') {
            try {
                const { sendMail } = await import("@/lib/sendMail");
                const { invoiceNotification } = await import("@/email/invoiceNotification");
                
                await sendMail(
                    `Invoice for Order #${orderData.order_id} - MetalVero`,
                    orderData.email,
                    invoiceNotification(orderData)
                );
            } catch (mailError) {
                console.error("Failed to send invoice email:", mailError);
            }
        }

        // Generate WhatsApp link for the admin to use if needed
        const waText = encodeURIComponent(`*METALVERO INVOICE*\n\nHello ${orderData.name},\nYour order *#${orderData.order_id}* is completed!\n\n*Total:* ₹${orderData.totalAmount}\n\nThank you!`);
        const waLink = `https://wa.me/${orderData.phone}?text=${waText}`;

        return response(true, 200, 'Order status updated successfully.', { ...orderData.toObject(), waLink })

    } catch (error) {
        return catchError(error)
    }
}
