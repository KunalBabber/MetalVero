'use client'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { BsRobot } from 'react-icons/bs'
import { IoMdClose, IoMdSend } from 'react-icons/io'
import ReactMarkdown from 'react-markdown'

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am your AI assistant. How can I help you today?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMessage = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])
        setLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: userMessage,
                    history: messages // Sending the current conversation history
                })
            })

            const data = await response.json()

            if (data.success) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
            } else {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: data.reply || 'Sorry, I encountered an error. Please try again later.' 
                }])
            }
        } catch (error) {
            console.error('Chat error:', error)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, checking connection failed.' }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed bottom-24 right-6 md:bottom-6 md:right-28 z-50 flex flex-col items-end'>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className='bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-2xl rounded-2xl w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] max-h-[calc(100vh-150px)] mb-4 flex flex-col overflow-hidden'
                    >
                        {/* Header */}
                        <div className='bg-primary text-white p-4 flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <BsRobot size={20} />
                                <span className='font-semibold'>AI Support</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className='hover:bg-white/20 p-1 rounded transition-colors'>
                                <IoMdClose size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-zinc-950'>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-bl-none'
                                        }`}>
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className='flex justify-start'>
                                    <div className='bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 p-3 rounded-2xl rounded-bl-none text-sm flex gap-1 items-center'>
                                        <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></span>
                                        <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></span>
                                        <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className='p-3 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex gap-2'>
                            <input
                                type='text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='Type your question...'
                                className='flex-1 bg-gray-100 dark:bg-zinc-800 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50'
                            />
                            <Button type='submit' size='icon' disabled={loading || !input.trim()} className='rounded-full w-10 h-10 shrink-0'>
                                <IoMdSend />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className='bg-primary text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors hover:bg-primary/90'
            >
                {isOpen ? <IoMdClose size={24} /> : <BsRobot size={24} />}
            </motion.button>
        </div>
    )
}

export default ChatWidget
