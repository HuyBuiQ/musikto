import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"
import Menu from "./Menu"
import React from 'react'
import { Login, Logout } from "@mui/icons-material"
import Link from "next/link"

const LeftSideBar = () => {
  return (
    <div className='h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar'>
      <div >
        <div className='flex flex-col gap-4 text-black'>

          <Menu />
          <hr />
          <SignedOut>

            <SignInButton><p>Log in</p></SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex gap-4 py-2 px-3">
              <UserButton />
              <p>Manage Account</p>
            </div>



            <SignOutButton>
              <div className="flex gap-4 px-4"><Logout />
                <p>Log Out</p></div>


            </SignOutButton>
          </SignedIn>
        </div>

      </div>
    </div>
  )
}

export default LeftSideBar