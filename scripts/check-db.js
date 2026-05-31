const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const checkDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is missing in .env.local");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully.");

        const products = await mongoose.connection.db.collection('products').find({}).toArray();
        console.log(`Total Products in DB: ${products.length}`);

        products.forEach(p => {
            console.log(`- Product: ${p.name}, Slug: ${p.slug}, DeletedAt: ${p.deletedAt}`);
        });

        process.exit(0);
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1);
    }
};

checkDB();
