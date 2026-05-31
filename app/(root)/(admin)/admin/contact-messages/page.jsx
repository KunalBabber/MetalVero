'use client'
import React, { useState } from 'react'
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
import { LuLoader, LuMail, LuCheck, LuClock } from "react-icons/lu";
import { FaWhatsapp } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { showToast } from '@/lib/showToast'
import { Badge } from '@/components/ui/badge'

const ContactMessages = () => {
    const queryClient = useQueryClient();
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [replySubject, setReplySubject] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [open, setOpen] = useState(false);

    const { data: messages, isLoading, isError, error } = useQuery({
        queryKey: ['contact-messages'],
        queryFn: async () => {
            const { data } = await axios.get('/api/contact')
            return data.data
        }
    })

    const handleReplyOpen = (msg) => {
        setSelectedMsg(msg);
        setReplySubject(`Re: ${msg.subject}`);
        setReplyMessage('');
        setOpen(true);
    }

    const handleSendReply = async () => {
        if (!replyMessage.trim()) return showToast('error', 'Please enter a message');
        
        setIsReplying(true);
        try {
            const { data } = await axios.post('/api/contact/reply', {
                contactId: selectedMsg._id,
                email: selectedMsg.email,
                subject: replySubject,
                message: replyMessage
            });

            if (data.success) {
                showToast('success', 'Reply sent successfully!');
                setOpen(false);
                queryClient.invalidateQueries(['contact-messages']);
            }
        } catch (error) {
            showToast('error', 'Failed to send reply');
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
                <h2 className='text-xl font-bold uppercase'>Contact Messages</h2>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {messages?.map((item) => (
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
                            <TableCell className="font-medium">{item.subject}</TableCell>
                            <TableCell>
                                <Badge variant={item.status === 'Contacted' ? 'success' : 'secondary'} className="flex items-center w-fit gap-1">
                                    {item.status === 'Contacted' ? <LuCheck size={12} /> : <LuClock size={12} />}
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate" title={item.message}>{item.message}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button asChild size="sm" variant="outline" className="h-8 w-8 p-0 border-green-500 text-green-600 hover:bg-green-50">
                                        <Link href={`https://wa.me/${item.phone}`} target="_blank">
                                            <FaWhatsapp />
                                        </Link>
                                    </Button>
                                    <Button onClick={() => handleReplyOpen(item)} size="sm" variant="outline" className="h-8 w-8 p-0 border-blue-500 text-blue-600 hover:bg-blue-50">
                                        <LuMail />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {messages?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                                No contact messages found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="uppercase font-black">Reply to Message</DialogTitle>
                        <DialogDescription>
                            Replying to: <span className="font-bold text-black dark:text-white">{selectedMsg?.email}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase">Subject</label>
                            <Input 
                                value={replySubject} 
                                onChange={(e) => setReplySubject(e.target.value)}
                                className="bg-gray-50 dark:bg-zinc-800 h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase">Your Message</label>
                            <Textarea 
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="Type your reply here..."
                                rows={6}
                                className="bg-gray-50 dark:bg-zinc-800 resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button 
                            disabled={isReplying} 
                            onClick={handleSendReply}
                            className="bg-primary hover:bg-black text-white px-8"
                        >
                            {isReplying ? 'Sending...' : 'Send Reply'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ContactMessages
