import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Logout, Search } from '@mui/icons-material'
import { SignedIn, SignOutButton } from '@clerk/nextjs'

const Topbar = () => {
  return (
    <div className='flex w-full justify-between px-4 py-4 border-b-2'>
      <div className='flex justify-between gap-2'>
        <Link href={"/"}>
          <Image src="icons/musikto_icon.svg" width={50} height={50} />

        </Link>
        <div className='flex search-bar mx-4'>
          <Search />
          <input
            type="text"

            className='bg-light-4 text-dark-1 border-none focus:outline-none'
            placeholder='Search on Musikto'
          // value={search}
          // onChange={(e)=>setSearch(e.target.value)}
          />

        </div>
      </div>
      <div className='flex gap-3'>
        <Link href={"/profile"}>
          <Image src="icons/musikto_icon.svg" width={50} height={50} className='rounded-full' />

        </Link>
        <SignedIn>
          <SignOutButton>
            <div className="flex gap-4 px-4 md:hidden items-center">
              <Logout sx={{fontSize:"32px"}}/>
            </div>


          </SignOutButton>
        </SignedIn>

      </div>






    </div>
  )
}

export default Topbar