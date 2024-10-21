"use client";
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { sidebarLinks } from '../../constants'

const Menu = () => {
    //take the path user are in
    const pathname = usePathname()
    return (
        <div className='flex flex-col gap-2'>
            {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                    <Link key={link.label} href={link.route} className={`flex gap-4 justify-start rounded-xl py-2 px-4 ${isActive && "bg-light-4"

                        }`}
                    >
                        {link.icon} <p className='text-black'>{link.label}</p>

                    </Link>
                )
            })}
        </div>
    )
}

export default Menu