export const quotationNotification = (data) => {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; }
                .header { text-align: center; border-bottom: 3px solid #ff6b00; padding-bottom: 20px; }
                .quote-box { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; border-left: 5px solid #ff6b00; }
                .price { font-size: 24px; color: #ff6b00; font-weight: bold; }
                .footer { margin-top: 30px; font-size: 12px; color: #888; text-align: center; }
                .btn { display: inline-block; padding: 12px 25px; background: #ff6b00; color: #fff !important; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="margin: 0; color: #333;">METALVERO</h1>
                    <p style="margin: 5px 0; color: #666;">Price Quotation / Estimate</p>
                </div>
                
                <p>Hello <strong>${data.name}</strong>,</p>
                <p>Thank you for your interest in our industrial designs. Based on your recent request for <strong>${data.productName || 'Custom Fabrication'}</strong>, we are pleased to provide the following quotation:</p>

                <div class="quote-box">
                    <p style="margin: 0;">Estimated Price:</p>
                    <div class="price">₹${data.price.toLocaleString('en-IN')}</div>
                    <p style="margin: 10px 0 0 0;"><strong>Validity:</strong> 15 Days from today</p>
                </div>

                <div style="margin-top: 20px;">
                    <strong>Details / Scope of Work:</strong><br>
                    <p style="white-space: pre-wrap;">${data.message}</p>
                </div>

                <div style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/shop" class="btn">VISIT OUR STORE</a>
                </div>

                <p style="margin-top: 30px;">If you would like to proceed with this quote, please reply to this email or contact us directly on WhatsApp at +91 8252338182.</p>

                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} MetalVero Industrial Furniture. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
    return html;
};
