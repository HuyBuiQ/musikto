"use client"
import React from 'react'
import Link from 'next/link';
import { useUser } from '@clerk/nextjs'
import News from "./News"

const RightSideBar = () => {
  const {user}= useUser()
  
  

  return (
    <div className='sticky right-0 top-0 z-20 h-screen flex flex-col gap-2 pl-6 pr-6'>
      <div className='flex flex-col gap-4 mt-6'>
        <h4 className='text-heading4-bold text-dark-1'>M-News</h4>
        
      


      </div>
      
      <News />
      </div>
  )
}

export default RightSideBar