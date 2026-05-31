import mongoose from "mongoose";

const customRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    dimensions: {
        type: String,
        trim: true,
        required: true
    },
    material: {
        type: String,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    images: [{
        secure_url: String,
        public_id: String
    }],
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Converted', 'Rejected'],
        default: 'Pending'
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    },

}, { timestamps: true })

const CustomRequestModel = mongoose.models.CustomRequest || mongoose.model('CustomRequest', customRequestSchema, 'custom_requests')
export default CustomRequestModel
