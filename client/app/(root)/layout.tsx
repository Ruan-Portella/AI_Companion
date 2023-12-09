import Navbar from '@/components/navbar'
import React from 'react'

export default function layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className= 'h-full'>
            <Navbar />
            <main className='md:pl-20 pt-16 h-full'>
            { children }
            </main>
        </div>
  )
}
