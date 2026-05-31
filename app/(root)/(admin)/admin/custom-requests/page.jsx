'use client'
import React from 'react'
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { LuLoader, LuEye, LuCheck } from "react-icons/lu";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from 'next/image'
import { showToast } from '@/lib/showToast'

const CustomRequests = () => {
    const queryClient = useQueryClient();
    const [selectedRequest, setSelectedRequest] = React.useState(null);
    const [quotePrice, setQuotePrice] = React.useState('');
    const [quoteMessage, setQuoteMessage] = React.useState('');
    const [isQuoteOpen, setIsQuoteOpen] = React.useState(false);
    const [isSending, setIsSending] = React.useState(false);

    const { data: requests, isLoading, isError, error } = useQuery({
        queryKey: ['custom-requests'],
        queryFn: async () => {
            const { data } = await axios.get('/api/custom-request')
            return data.data
        }
    })

    const mutation = useMutation({
        mutationFn: async (id) => {
            const { data } = await axios.post('/api/custom-request/convert', { id });
            return data;
        },
        onSuccess: (data) => {
            showToast('success', data.message);
            queryClient.invalidateQueries(['custom-requests']);
        },
        onError: (error) => {
            showToast('error', error.response?.data?.message || 'Conversion failed');
        }
    });

    const handleConvert = (id) => {
        if (confirm("Are you sure you want to convert this request to an Order? It will create a pending order with 0 price which you can edit later.")) {
            mutation.mutate(id);
        }
    }

    const handleQuoteOpen = (request) => {
        setSelectedRequest(request);
        setQuotePrice('');
        setQuoteMessage(`We have reviewed your custom design request for ${request.dimensions} ${request.material} project. Here is our estimated quotation.`);
        setIsQuoteOpen(true);
    }

    const handleSendQuote = async () => {
        if (!quotePrice) return showToast('error', 'Please enter a price');
        setIsSending(true);
        try {
            await axios.post('/api/quotation/send', {
                email: selectedRequest.email,
                name: selectedRequest.name,
                productName: `Custom ${selectedRequest.material} Project`,
                price: parseFloat(quotePrice),
                message: quoteMessage
            });
            showToast('success', 'Quotation sent successfully!');
            setIsQuoteOpen(false);
        } catch (error) {
            showToast('error', 'Failed to send quotation');
        } finally {
            setIsSending(false);
        }
    }

    if (isLoading) return <div className="flex justify-center py-20"><LuLoader className="animate-spin text-4xl" /></div>
    if (isError) return <div className="text-center py-20 text-red-500">Error: {error.message}</div>

    return (
        <div className='bg-white dark:bg-zinc-900 shadow-sm border rounded-lg overflow-hidden'>
            <div className='p-5 border-b flex justify-between items-center'>
                <h2 className='text-xl font-bold uppercase'>Custom Design Requests Management</h2>
            </div>

            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Specs</TableHead>
                        <TableHead>Images</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className="whitespace-nowrap">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-bold">{item.name}</span>
                                    <span className="text-xs text-gray-500">{item.email}</span>
                                    <span className="text-xs text-gray-500">{item.phone}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-xs space-y-1">
                                    <p><strong>Dim:</strong> {item.dimensions}</p>
                                    <p><strong>Mat:</strong> {item.material}</p>
                                    <p><strong>Qty:</strong> {item.quantity}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex -space-x-2">
                                    {item.images?.slice(0, 3).map((img, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border border-white overflow-hidden relative">
                                            <Image src={img.secure_url} alt="mini" fill className="object-cover" />
                                        </div>
                                    ))}
                                    {item.images?.length > 3 && <span className="text-xs pl-2 pt-2">+{item.images.length - 3}</span>}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${item.status === 'Converted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {item.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm"><LuEye /></Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Request Details</DialogTitle>
                                                <DialogDescription>{item.name} - {new Date(item.createdAt).toLocaleString()}</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 mt-4">
                                                <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded">
                                                    <p className="whitespace-pre-wrap">{item.description}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {item.images?.map((img, i) => (
                                                        <div key={i} className="relative aspect-video rounded overflow-hidden border">
                                                            <Image src={img.secure_url} alt="detail" fill className="object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <Button onClick={() => handleQuoteOpen(item)} variant="outline" size="sm" className="h-8 w-8 p-0 border-orange-500 text-orange-600 hover:bg-orange-50 shadow-sm" title="SEND PRICE QUOTATION">
                                        <span className="text-sm font-black">₹</span>
                                    </Button>

                                    {item.status !== 'Converted' && (
                                        <Button variant="default" size="sm" onClick={() => handleConvert(item._id)} disabled={mutation.isPending}>
                                            <LuCheck className="mr-2" /> Convert
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {requests?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                                No custom requests found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </div>

            <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="uppercase font-black text-orange-600">Send Price Quotation</DialogTitle>
                        <DialogDescription>
                            Sending to: <span className="font-bold">{selectedRequest?.email}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-gray-500">Quotation Price (INR)</label>
                            <input 
                                type="number"
                                value={quotePrice} 
                                onChange={(e) => setQuotePrice(e.target.value)}
                                className="w-full p-3 border rounded-lg bg-orange-50 focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="Enter estimated price..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-gray-500">Details / Special Note</label>
                            <textarea 
                                value={quoteMessage}
                                onChange={(e) => setQuoteMessage(e.target.value)}
                                rows={6}
                                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none resize-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button 
                            variant="outline" 
                            className="border-green-600 text-green-600 hover:bg-green-50 h-12 font-bold"
                            asChild
                        >
                            <a 
                                href={`https://wa.me/${selectedRequest?.phone}?text=${encodeURIComponent(`*METALVERO CUSTOM QUOTATION*\n\nHello ${selectedRequest?.name},\n\nFor your custom ${selectedRequest?.material} project (${selectedRequest?.dimensions}), our estimated quotation is:\n\n*Price: ₹${quotePrice || '---'}*\n\nNote: ${quoteMessage}\n\nLooking forward to hearing from you!\n\n_Sent via MetalVero Admin_`)}`}
                                target="_blank"
                            >
                                Send via WhatsApp
                            </a>
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => setIsQuoteOpen(false)} className="flex-1">Cancel</Button>
                            <Button 
                                disabled={isSending} 
                                onClick={handleSendQuote}
                                className="bg-orange-600 hover:bg-orange-700 text-white flex-1 h-12 font-bold uppercase tracking-wider"
                            >
                                {isSending ? 'Sending...' : 'Send Email Quote'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CustomRequests
