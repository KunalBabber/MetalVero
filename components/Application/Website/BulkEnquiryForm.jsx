'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/showToast';

const BulkEnquiryForm = ({ productName, productImage }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        quantity: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { 
                ...formData, 
                productName, 
                productImage: productImage || '', 
                subject: `Bulk Enquiry: ${productName}` 
            };
            console.log("Submitting Enquiry:", payload);
            await axios.post('/api/enquiry', payload);
            showToast('success', 'Enquiry sent successfully! We will contact you soon.');
            setFormData({ name: '', email: '', phone: '', quantity: '', message: '' });
        } catch (error) {
            console.error(error);
            showToast('error', 'Failed to send enquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-lg mt-10">
            <h3 className="text-2xl font-black uppercase mb-4 text-zinc-900 dark:text-white">
                Bulk / Custom Order Enquiry
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                Interested in ordering <strong>{productName}</strong> in bulk or need a custom modification? Fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name / Company Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-700 w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-700 w-full"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-700 w-full"
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Estimated Quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-700 w-full"
                />
                <textarea
                    name="message"
                    placeholder="Additional Details (Customization, Delivery Date, etc.)"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="md:col-span-2 p-3 border border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-700 w-full"
                ></textarea>

                <div className="md:col-span-2">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 uppercase tracking-widest"
                    >
                        {loading ? 'Sending...' : 'Send Enquiry'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BulkEnquiryForm;
