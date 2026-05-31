'use client'
import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import useFetch from '@/hooks/useFetch'
import Image from 'next/image'
import React from 'react'

const breadCrumbData = {
    title: 'Custom Requests',
    links: [
        { label: 'Dashboard', url: '/my-account' },
        { label: 'Custom Requests' }
    ]
}

const CustomRequests = () => {
    const { data: requestsData, loading, error } = useFetch('/api/dashboard/user/custom-requests')

    return (
        <div>
            <WebsiteBreadcrumb props={breadCrumbData} />
            <UserPanelLayout>
                <div className='shadow rounded'>
                    <div className='p-5 text-xl font-semibold border-b'>
                        Custom Design Requests
                    </div>
                    <div className='p-5'>
                        {loading ? (
                            <div className='text-center py-10'>Loading...</div>
                        ) : error ? (
                            <div className='text-center py-10 text-red-500'>Error loading requests</div>
                        ) : requestsData?.data?.length === 0 ? (
                            <div className='text-center py-10 text-gray-500'>No custom requests found</div>
                        ) : (
                            <div className='grid gap-5'>
                                {requestsData?.data?.map((request) => (
                                    <div key={request._id} className='border rounded p-4 flex flex-col md:flex-row gap-5 items-start'>
                                        <div className='w-full md:w-32 h-32 flex-shrink-0 relative border rounded overflow-hidden'>
                                            {request.images && request.images.length > 0 ? (
                                                <Image
                                                    src={request.images[0].secure_url}
                                                    alt={request.name}
                                                    fill
                                                    className='object-cover'
                                                />
                                            ) : (
                                                <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-400'>
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex-grow'>
                                            <div className='flex justify-between items-start flex-wrap gap-2'>
                                                <h3 className='font-semibold text-lg'>{request.name}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                    {request.status}
                                                </span>
                                            </div>
                                            <div className='text-sm text-gray-600 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1'>
                                                <p><span className='font-medium'>Date:</span> {new Date(request.createdAt).toLocaleDateString()}</p>
                                                <p><span className='font-medium'>Material:</span> {request.material}</p>
                                                <p><span className='font-medium'>Dimensions:</span> {request.dimensions}</p>
                                                <p><span className='font-medium'>Quantity:</span> {request.quantity}</p>
                                            </div>
                                            <p className='text-sm text-gray-600 mt-2 line-clamp-2'>
                                                <span className='font-medium'>Description:</span> {request.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </UserPanelLayout>
        </div>
    )
}

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800'
        case 'Contacted':
            return 'bg-blue-100 text-blue-800'
        case 'Converted':
            return 'bg-green-100 text-green-800'
        case 'Rejected':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export default CustomRequests
