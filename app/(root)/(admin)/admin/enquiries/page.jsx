'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LuLoader, LuMessageSquare, LuMail } from "react-icons/lu";
import { FaWhatsapp } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { showToast } from '@/lib/showToast'
import { Badge } from '@/components/ui/badge'

const Enquiries = () => {
    const queryClient = useQueryClient();
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [replySubject, setReplySubject] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [open, setOpen] = useState(false);
    const [previewImg, setPreviewImg] = useState(null);
    const [quotePrice, setQuotePrice] = useState('');
    const [isQuoteMode, setIsQuoteMode] = useState(false);

    const { data: enquiries, isLoading, isError, error } = useQuery({
        queryKey: ['enquiries'],
        queryFn: async () => {
            const { data } = await axios.get('/api/enquiry')
            return data.data
        }
    })

    const handleReplyOpen = (enquiry, mode = 'reply') => {
        setSelectedEnquiry(enquiry);
        setIsQuoteMode(mode === 'quote');
        setQuotePrice('');
        if (mode === 'quote') {
            setReplySubject(`Quotation: ${enquiry.productName || 'Custom Request'}`);
            setReplyMessage(`Based on your enquiry, here is our estimated price for the project.`);
        } else {
            setReplySubject(`Re: ${enquiry.subject || 'Enquiry for ' + enquiry.productName}`);
            setReplyMessage('');
        }
        setOpen(true);
    }

    const handleSendAction = async () => {
        if (!replyMessage.trim()) return showToast('error', 'Please enter a message');
        if (isQuoteMode && !quotePrice) return showToast('error', 'Please enter a price');
        
        setIsReplying(true);
        try {
            const endpoint = isQuoteMode ? '/api/quotation/send' : '/api/enquiry/reply';
            const payload = isQuoteMode ? {
                email: selectedEnquiry.email,
                name: selectedEnquiry.name,
                productName: selectedEnquiry.productName,
                price: parseFloat(quotePrice),
                message: replyMessage
            } : {
                enquiryId: selectedEnquiry._id,
                email: selectedEnquiry.email,
                subject: replySubject,
                message: replyMessage
            };

            const { data } = await axios.post(endpoint, payload);

            if (data.success) {
                showToast('success', isQuoteMode ? 'Quotation sent!' : 'Reply sent!');
                setOpen(false);
                queryClient.invalidateQueries(['enquiries']);
            }
        } catch (error) {
            showToast('error', 'Action failed');
        } finally {
            setIsReplying(false);
        }
    }

    if (isLoading) {
        return <div className="flex justify-center py-20"><LuLoader className="animate-spin text-4xl" /></div>
    }

    if (isError) {
        return <div className="text-center py-20 text-red-500">Error: {error.message}</div>
    }

    return (
        <div className='bg-white dark:bg-zinc-900 shadow-sm border rounded-lg overflow-hidden'>
            <div className='p-5 border-b flex justify-between items-center'>
                <h2 className='text-xl font-bold uppercase'>Customer Inquiries & Project Leads</h2>
            </div>

            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {enquiries?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className="whitespace-nowrap">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>
                                <div 
                                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => item.productImage && setPreviewImg(item.productImage)}
                                >
                                    {item.productImage ? (
                                        <div className="w-12 h-12 flex-shrink-0 rounded border overflow-hidden bg-gray-50">
                                            <img 
                                                src={item.productImage} 
                                                alt={item.productName}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 flex-shrink-0 rounded border bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                                            No Img
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="font-bold text-xs uppercase text-primary">{item.productName || 'General Inquiry'}</span>
                                        <span className="text-sm text-gray-500">{item.subject}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="font-bold text-gray-700">{item.quantity || 'N/A'}</TableCell>
                            <TableCell>
                                <Badge variant={item.status === 'Contacted' ? 'success' : 'secondary'}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col text-xs">
                                    <span>{item.email}</span>
                                    <span>{item.phone}</span>
                                </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate" title={item.message}>{item.message}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button asChild size="sm" variant="outline" className="h-8 w-8 p-0 border-green-500 text-green-600 hover:bg-green-50">
                                        <Link href={`https://wa.me/${item.phone}`} target="_blank">
                                            <FaWhatsapp />
                                        </Link>
                                    </Button>
                                    <Button onClick={() => handleReplyOpen(item)} size="sm" variant="outline" className="h-8 w-8 p-0 border-blue-500 text-blue-600 hover:bg-blue-50" title="Reply">
                                        <LuMail />
                                    </Button>
                                    <Button onClick={() => handleReplyOpen(item, 'quote')} size="sm" variant="outline" className="h-8 w-8 p-0 border-orange-500 text-orange-600 hover:bg-orange-50 shadow-sm" title="SEND PRICE QUOTATION">
                                        <span className="text-sm font-black">₹</span>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>

            <Dialog open={!!previewImg} onOpenChange={() => setPreviewImg(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none">
                    <DialogTitle className="sr-only">Product Image Preview</DialogTitle>
                    <div className="w-full h-full flex items-center justify-center">
                        <img 
                            src={previewImg} 
                            alt="Preview" 
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="uppercase font-black">{isQuoteMode ? 'Send Quotation' : 'Reply to Enquiry'}</DialogTitle>
                        <DialogDescription>
                            Sending to: <span className="font-bold text-black dark:text-white">{selectedEnquiry?.email}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {isQuoteMode && (
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase">Quotation Price (INR)</label>
                                <Input 
                                    type="number"
                                    value={quotePrice} 
                                    onChange={(e) => setQuotePrice(e.target.value)}
                                    className="bg-orange-50 dark:bg-zinc-800 border-orange-200"
                                    placeholder="Enter estimated price..."
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase">Subject</label>
                            <Input 
                                value={replySubject} 
                                onChange={(e) => setReplySubject(e.target.value)}
                                className="bg-gray-50 dark:bg-zinc-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase">{isQuoteMode ? 'Offer Details / Note' : 'Your Message'}</label>
                            <Textarea 
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="Type here..."
                                rows={6}
                                className="bg-gray-50 dark:bg-zinc-800 resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        {isQuoteMode && (
                            <Button 
                                variant="outline" 
                                className="border-green-500 text-green-600 hover:bg-green-50"
                                asChild
                            >
                                <a 
                                    href={`https://wa.me/${selectedEnquiry?.phone}?text=${encodeURIComponent(`*METALVERO QUOTATION*\n\nHello ${selectedEnquiry?.name},\n\nFor your enquiry about *${selectedEnquiry?.productName}*, our estimated quotation is:\n\n*Price: ₹${quotePrice || '---'}*\n\nNote: ${replyMessage}\n\nLooking forward to hearing from you!\n\n_Sent via MetalVero Admin_`)}`}
                                    target="_blank"
                                >
                                    <FaWhatsapp className="mr-2" /> Send via WA
                                </a>
                            </Button>
                        )}
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button 
                            disabled={isReplying} 
                            onClick={handleSendAction}
                            className={`${isQuoteMode ? 'bg-orange-600 hover:bg-orange-700' : 'bg-primary hover:bg-black'} text-white px-8`}
                        >
                            {isReplying ? 'Sending...' : (isQuoteMode ? 'Send Quotation Email' : 'Send Reply')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Enquiries
