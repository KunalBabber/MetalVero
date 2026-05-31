import mongoose from "mongoose";

const ProductVariantSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },


    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    media: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Media',
            required: true
        }
    ],

    deletedAt: {
        type: Date,
        default: null,
        index: true
    },

}, { timestamps: true })


if (mongoose.models.ProductVariant) {
  delete mongoose.models.ProductVariant;
}
const ProductVariantModel = mongoose.model('ProductVariant', ProductVariantSchema, 'productvariants');
export default ProductVariantModel;
