import React from 'react'

const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className='hidden lg:flex items-center justify-center bg-base-200 p-10'>
            <div className='max-w-md text-center'>
                <div className='grid grid-cols-3 gap-3 mb-6'>
                    {[...Array(9)].map((_, idx) => (
                        <div key={idx} className={`aspect-square rounded-2xl bg-primary/30 bg-gray-500 ${idx % 2 === 0 ? 'animate-pulse' : ''}`}></div>
                    ))}
                </div>
                <h2 className='text-2xl font-bold mb-4'>{title}</h2>
                <p className='text-base-content/60'>{subtitle}</p>
            </div>
        </div>
    )
}

export default AuthImagePattern