'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/showToast';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import { FiUploadCloud, FiX } from "react-icons/fi";
import Image from 'next/image';

const CustomDesignPage = () => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dimensions: '',
        material: '',
        quantity: 1,
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpload = (results) => {
        const file = results.info;
        setImages(prev => [...prev, { secure_url: file.secure_url, public_id: file.public_id }]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/custom-request', { ...formData, images });
            showToast('success', 'Custom design request sent! We will verify it and get back to you.');
            setFormData({
                name: '', email: '', phone: '', dimensions: '', material: '', quantity: 1, description: ''
            });
            setImages([]);
        } catch (error) {
            console.error(error);
            showToast('error', 'Failed to send request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen py-20 px-4 md:px-20">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden">
                <div className="bg-zinc-900 text-white p-10 text-center">
                    <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Design Your Dream</h1>
                    <p className="text-gray-400">Share your vision, and we'll forge it into reality.</p>
                </div>

                <div className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-3 border rounded dark:bg-zinc-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Email</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3 border rounded dark:bg-zinc-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Phone</label>
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded dark:bg-zinc-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Quantity</label>
                                <input type="number" name="quantity" min="1" required value={formData.quantity} onChange={handleChange} className="w-full p-3 border rounded dark:bg-zinc-800" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Dimensions (L x W x H)</label>
                                <input type="text" name="dimensions" placeholder="e.g. 6ft x 3ft x 30in" required value={formData.dimensions} onChange={handleChange} className="w-full p-3 border rounded dark:bg-zinc-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Preferred Material</label>
                                <select name="material" value={formData.material} onChange={handleChange} className="w-full p-3 border rounded dark:bg-zinc-800" required>
                                    <option value="">Select Material</option>
                                    <option value="Iron">Iron</option>
                                    <option value="Steel">Steel</option>
                                    <option value="Wood & Metal">Wood & Metal</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase mb-2">Description</label>
                            <textarea name="description" rows="4" placeholder="Describe the design, finish, and specifics..." required value={formData.description} onChange={handleChange} className="w-full p-3 border rounded dark:bg-zinc-800"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase mb-2">Reference Images (Optional)</label>
                            <div className="flex flex-wrap gap-4 mb-4">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                                        <Image src={img.secure_url} alt="upload" fill className="object-cover" />
                                        <button type="button" onClick={() => removeImage(idx)} className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full text-xs">
                                            <FiX />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <CldUploadWidget
                                signatureEndpoint="/api/cloudinary-signature"
                                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                onSuccess={handleUpload}
                                options={{
                                    multiple: true,
                                    maxFiles: 5,
                                    sources: ['local', 'url', 'camera'],
                                }}
                            >
                                {({ open }) => (
                                    <Button type="button" variant="outline" onClick={() => open()} className="w-full h-16 border-dashed border-2 flex flex-col items-center justify-center gap-2">
                                        <FiUploadCloud className="text-2xl" />
                                        <span>Click to Upload Images</span>
                                    </Button>
                                )}
                            </CldUploadWidget>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg uppercase tracking-widest mt-8">
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomDesignPage;
