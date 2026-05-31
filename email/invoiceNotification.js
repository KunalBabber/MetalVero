export const invoiceNotification = (order) => {
    const productRows = order.products.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.sellingPrice.toLocaleString('en-IN')}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.sellingPrice * item.qty).toLocaleString('en-IN')}</td>
        </tr>
    `).join('');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
                .header { text-align: center; border-bottom: 2px solid #primary; padding-bottom: 10px; }
                .invoice-details { display: flex; justify-content: space-between; margin-top: 20px; }
                .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                .table th { background: #f8f8f8; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
                .totals { margin-top: 20px; text-align: right; }
                .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="color: #primary; margin: 0;">METALVERO</h1>
                    <p style="margin: 5px 0;">Official Invoice / Bill</p>
                </div>
                
                <div class="invoice-details">
                    <div>
                        <strong>Billed To:</strong><br>
                        ${order.name}<br>
                        ${order.city}, ${order.state} - ${order.pincode}<br>
                        Phone: ${order.phone}
                    </div>
                    <div style="text-align: right;">
                        <strong>Order ID:</strong> ${order.order_id}<br>
                        <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br>
                        <strong>Status:</strong> COMPLETED
                    </div>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th style="text-align: center;">Qty</th>
                            <th style="text-align: right;">Price</th>
                            <th style="text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productRows}
                    </tbody>
                </table>

                <div class="totals">
                    <p>Subtotal: ₹${order.subtotal.toLocaleString('en-IN')}</p>
                    ${order.discount > 0 ? `<p>Discount: -₹${order.discount.toLocaleString('en-IN')}</p>` : ''}
                    ${order.couponDiscountAmount > 0 ? `<p>Coupon: -₹${order.couponDiscountAmount.toLocaleString('en-IN')}</p>` : ''}
                    <h2 style="color: #000;">Total Amount: ₹${order.totalAmount.toLocaleString('en-IN')}</h2>
                </div>

                <div class="footer">
                    <p>Thank you for choosing MetalVero! This is a computer-generated invoice.</p>
                    <p>Contact us at support@metalvero.com for any queries.</p>
                </div>
            </div>
        </body>
        </html>
    `;
    return html;
};
