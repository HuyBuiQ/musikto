"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '../../constants'
import Link from 'next/link'

const BottomBar = () => {
  const pathname = usePathname()
  return (
    <div className='flex bottom-0 z-20 w-full px-6 py-3 items-center justify-between md:hidden'>
      {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                    <Link key={link.label} href={link.route} className={`flex gap-4 justify-start rounded-xl py-2 px-4 ${isActive && "bg-light-4"

                        }`}
                    >
                        {link.icon} <p className='text-black text-small-medium max-sm:hidden'>{link.label}</p>

                    </Link>
                )
            })}
    </div>
  )
}

export default BottomBar