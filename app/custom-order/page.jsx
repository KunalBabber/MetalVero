'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CldUploadWidget } from 'next-cloudinary'
import { showToast } from '@/lib/showToast'
import axios from 'axios'
import Image from 'next/image'
import { FiUpload, FiX } from 'react-icons/fi'
import { FaPenNib, FaCogs, FaHammer, FaTruck } from 'react-icons/fa'

const CustomOrders = () => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dimensions: '',
        material: '',
        quantity: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOnQueueEnd = (results) => {
        const files = results.info.files;
        const newImages = files.filter(file => file.uploadInfo).map(file => ({
            secure_url: file.uploadInfo.secure_url,
            public_id: file.uploadInfo.public_id
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/custom-request', { ...formData, images });
            showToast('success', 'Custom request submitted successfully! We will review and contact you.');
            setFormData({
                name: '', email: '', phone: '', dimensions: '', material: '', quantity: '', description: ''
            });
            setImages([]);
        } catch (error) {
            console.error(error);
            showToast('error', 'Failed to submit request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 pb-20">
            
            {/* HERO SECTION */}
            <section className="relative h-[50vh] flex items-center justify-center bg-zinc-950 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/70 z-10" />
                <div
                    className="absolute inset-0 z-0 opacity-50"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="relative z-20 text-center px-4 max-w-3xl mx-auto mt-10">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Bespoke Manufacturing</span>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
                        Custom <span className="text-primary">Metal</span> Designs
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-light">
                        Have a specific design in mind? Upload your drawings, sketches, or reference images, and our engineering team will bring it to life.
                    </p>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="py-16 px-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black uppercase tracking-wide">How It Works</h2>
                        <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {[
                            { icon: FaPenNib, title: "1. Share Vision", desc: "Upload sketches, dimensions, and material preferences." },
                            { icon: FaCogs, title: "2. Engineering", desc: "Our team creates structural drafts and quotes the project." },
                            { icon: FaHammer, title: "3. Fabrication", desc: "Forged and welded by our expert industrial craftsmen." },
                            { icon: FaTruck, title: "4. Delivery", desc: "Securely packaged and shipped directly to your site." }
                        ].map((step, idx) => (
                            <div key={idx} className="text-center relative z-10 p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-20 h-20 mx-auto bg-gray-50 dark:bg-zinc-800 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm border-2 border-primary/20">
                                    <step.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold uppercase mb-3 tracking-wider">{step.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FORM SECTION */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                        
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-black uppercase mb-2">Request a Quote</h2>
                            <p className="text-gray-500 dark:text-gray-400">Fill out the details below to help us understand your requirements.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Personal Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Name / Company</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-4 border-b-2 border-gray-200 dark:border-zinc-700 bg-transparent focus:border-primary focus:outline-none transition-colors" placeholder="John Doe / Acme Corp" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Email Address</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-4 border-b-2 border-gray-200 dark:border-zinc-700 bg-transparent focus:border-primary focus:outline-none transition-colors" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Phone Number</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-4 border-b-2 border-gray-200 dark:border-zinc-700 bg-transparent focus:border-primary focus:outline-none transition-colors" placeholder="+91 98765 43210" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Quantity Required</label>
                                    <input type="number" name="quantity" required min="1" value={formData.quantity} onChange={handleChange} className="w-full p-4 border-b-2 border-gray-200 dark:border-zinc-700 bg-transparent focus:border-primary focus:outline-none transition-colors" placeholder="e.g. 50" />
                                </div>
                            </div>

                            {/* Technical Specs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 dark:bg-zinc-950/50 p-6 rounded-lg border border-gray-100 dark:border-zinc-800">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Dimensions (L x W x H)</label>
                                    <input type="text" name="dimensions" required value={formData.dimensions} onChange={handleChange} className="w-full p-3 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="e.g. 10ft x 4ft x 3ft" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Preferred Material</label>
                                    <select name="material" required value={formData.material} onChange={handleChange} className="w-full p-3 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                                        <option value="">Select Material</option>
                                        <option value="Mild Steel">Mild Steel</option>
                                        <option value="Stainless Steel">Stainless Steel (SS)</option>
                                        <option value="Wrought Iron">Wrought Iron</option>
                                        <option value="Aluminum">Aluminum</option>
                                        <option value="Brass">Brass</option>
                                        <option value="Other">Other (Specify in desc)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Project Description / Special Instructions</label>
                                <textarea name="description" required rows="4" value={formData.description} onChange={handleChange} className="w-full p-4 border rounded bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Describe finish, structural requirements, load capacity, color etc."></textarea>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Upload Drawings / References</label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg p-8 text-center bg-gray-50 dark:bg-zinc-950/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                                    <CldUploadWidget
                                        signatureEndpoint="/api/cloudinary-signature"
                                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                        onQueuesEnd={handleOnQueueEnd}
                                        options={{
                                            multiple: true,
                                            sources: ['local', 'url', 'camera'],
                                            maxFiles: 5
                                        }}
                                    >
                                        {({ open }) => (
                                            <button type="button" onClick={() => open()} className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors">
                                                <div className="w-14 h-14 bg-white dark:bg-zinc-700 rounded-full flex items-center justify-center shadow-sm mb-4">
                                                    <FiUpload className="text-2xl text-primary" />
                                                </div>
                                                <span className="font-bold text-lg">Click to Upload Files</span>
                                                <span className="text-sm mt-1 opacity-70">Support for JPG, PNG, PDF (Max 5 files)</span>
                                            </button>
                                        )}
                                    </CldUploadWidget>
                                </div>

                                {images.length > 0 && (
                                    <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                                        {images.map((img, idx) => (
                                            <div key={idx} className="relative w-24 h-24 flex-shrink-0 border-2 border-primary/20 rounded-md overflow-hidden group shadow-sm">
                                                <Image src={img.secure_url} fill alt="uploaded" className="object-cover group-hover:scale-110 transition-transform" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button type="button" onClick={() => handleRemoveImage(idx)} className="bg-red-600 text-white p-2 rounded-full transform hover:scale-110 transition-transform">
                                                        <FiX size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button type="submit" disabled={loading} className="w-full h-16 bg-black hover:bg-primary text-white dark:bg-white dark:text-black dark:hover:bg-primary dark:hover:text-white font-bold uppercase tracking-widest text-lg rounded-sm transition-all duration-300">
                                {loading ? 'Submitting Request...' : 'Submit Custom Request'}
                            </Button>

                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CustomOrders
