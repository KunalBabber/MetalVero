import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ButtonLoading from './ButtonLoading'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { showToast } from '@/lib/showToast'
import axios from 'axios'

const OTPVerification = ({ email, onSubmit, loading }) => {

    const [isResendingOtp, setIsResendingOtp] = useState(false)
    const [timeLeft, setTimeLeft] = useState(600) // 10 minutes

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const formSchema = zSchema.pick({
        otp: true, email: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            email: email
        }
    })

    const handleOtpVerification = async (values) => {
        onSubmit(values)
    }

    const resendOTP = async () => {
        try {
            setIsResendingOtp(true)
            const { data: resendOtpResponse } = await axios.post('/api/auth/resend-otp',
                { email }
            )
            if (!resendOtpResponse.success) {
                throw new Error(resendOtpResponse.message)
            }
            setTimeLeft(600)
            showToast('success', resendOtpResponse.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setIsResendingOtp(false)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOtpVerification)} >
                    <div className='text-center' >
                        <h1 className='text-2xl font-bold mb-2'>Please complete verification</h1>
                        <p className='text-md'>We have sent an One-time Password (OTP) to your registered email address. The OTP is valid for 10 minutes only.</p>
                    </div>
                    <div className='mb-5 mt-5 flex justify-center'>
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">One-time Password (OTP)</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot className="text-xl size-10" index={0} />
                                                <InputOTPSlot className="text-xl size-10" index={1} />
                                                <InputOTPSlot className="text-xl size-10" index={2} />
                                                <InputOTPSlot className="text-xl size-10" index={3} />
                                                <InputOTPSlot className="text-xl size-10" index={4} />
                                                <InputOTPSlot className="text-xl size-10" index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='mb-3'>
                        <ButtonLoading loading={loading} disabled={timeLeft === 0} type="submit" text="Verify" className="w-full cursor-pointer" />
                        <div className='text-center mt-5'>
                            <div className="mb-2 font-medium text-gray-600 dark:text-gray-300">
                                {timeLeft > 0 ? (
                                    <span>Expires in: {formatTime(timeLeft)}</span>
                                ) : (
                                    <span className="text-red-500">OTP Expired</span>
                                )}
                            </div>
                            {!isResendingOtp ?
                                <button onClick={resendOTP} type='button' className='text-blue-500 cursor-pointer hover:underline'>Resend OTP</button>
                                :
                                <span className='text-md'>Resending....</span>
                            }

                        </div>
                    </div>

                </form>
            </Form>
        </div>
    )
}

export default OTPVerification
