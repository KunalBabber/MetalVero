import React from 'react'

const layout = ({ children }) => {
    return (
        <div className='h-screen w-screen flex justify-center items-center px-4'>{children}</div>
    )
}

export default layout
