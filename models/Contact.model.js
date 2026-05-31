import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Resolved'],
        default: 'Pending'
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true
    },

}, { timestamps: true })

const ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema, 'contacts')
export default ContactModel
