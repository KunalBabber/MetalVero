const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
};

const deletePlaceholder = async () => {
    try {
        await connectDB();
        const ProductModel = mongoose.model('Product', new mongoose.Schema({ slug: String }, { strict: false }));

        const result = await ProductModel.deleteOne({ slug: 'custom-order-placeholder' });
        console.log("Deleted count:", result.deletedCount);

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

deletePlaceholder();
