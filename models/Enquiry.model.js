import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
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
    productName: {
        type: String,
        trim: true,
    },
    productImage: {
        type: String,
        trim: true,
    },
    quantity: {
        type: String, 
        trim: true,
    },
    subject: {
        type: String,
        trim: true,
        default: 'General Inquiry'
    },
    message: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Resolved', 'Ignored'],
        default: 'Pending'
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    },

}, { timestamps: true })

const EnquiryModel = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema, 'enquiries')
export default EnquiryModel
