'use client'
import React, { useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone, MdOutlineMail, MdSend } from "react-icons/md";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/showToast';
import axios from 'axios';

const ContactUs = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('/api/contact', formData);
            if (data.success) {
                showToast('success', 'Your message has been sent successfully!');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                showToast('error', data.message || 'Something went wrong');
            }
        } catch (error) {
            showToast('error', error.response?.data?.message || 'Error sending message');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100'>
            <div className='container mx-auto px-4 py-16'>
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Get In Touch</span>
                    <h1 className='text-4xl font-black uppercase mt-2'>Contact Us</h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto'>
                        Have a bulk inquiry or need support? Reach out to our factory representatives directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {/* Contact Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-lg border border-gray-100 dark:border-zinc-800">
                            <h3 className="text-xl font-bold uppercase mb-6 border-b pb-2">Factory Address</h3>
                            <div className="flex gap-4 items-start">
                                <IoLocationOutline className="text-primary text-2xl flex-shrink-0 mt-1" />
                                <p className="text-gray-600 dark:text-gray-300">
                                    MetalVero Industrial Park,<br />
                                    Plot No. 45-48, Sector 12,<br />
                                    Lucknow, Uttar Pradesh, 256320<br />
                                    India
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-lg border border-gray-100 dark:border-zinc-800">
                            <h3 className="text-xl font-bold uppercase mb-6 border-b pb-2">Contact Info</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4 items-center">
                                    <MdOutlinePhone className="text-primary text-2xl flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-sm uppercase text-gray-500">Sales & Inquiry</p>
                                        <p className="text-lg font-semibold">+91 85698 74589</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <MdOutlineMail className="text-primary text-2xl flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-sm uppercase text-gray-500">Email Address</p>
                                        <p className="text-lg font-semibold">support@MetalVero.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-lg border border-gray-100 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-2xl font-bold uppercase mb-8">Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase">Full Name</label>
                                <Input 
                                    name="name"
                                    placeholder="Enter your name" 
                                    required 
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-zinc-800 border-none h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase">Email Address</label>
                                <Input 
                                    name="email"
                                    type="email" 
                                    placeholder="Enter your email" 
                                    required 
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-zinc-800 border-none h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase">Phone Number</label>
                                <Input 
                                    name="phone"
                                    type="tel" 
                                    placeholder="Enter phone number" 
                                    required 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-zinc-800 border-none h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase">Subject</label>
                                <Input 
                                    name="subject"
                                    placeholder="Inquiry Subject" 
                                    required 
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-zinc-800 border-none h-12"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold uppercase">Your Message</label>
                                <Textarea 
                                    name="message"
                                    placeholder="How can we help you?" 
                                    required 
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-zinc-800 border-none resize-none"
                                />
                            </div>
                            <div className="md:col-span-2 mt-4">
                                <Button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full md:w-auto px-12 h-14 bg-primary hover:bg-black text-white font-bold uppercase tracking-widest transition-all rounded-sm"
                                >
                                    {loading ? 'Sending...' : (
                                        <span className="flex items-center gap-2">
                                            Send Message <MdSend />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-20 h-[450px] w-full bg-gray-200 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.39958169971!2d80.86543884391785!3d26.84869408477017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd0a55555555%3A0xce8f6c91a0c0e7b8!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
