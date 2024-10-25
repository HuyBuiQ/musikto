
import { ClerkProvider, useAuth, RedirectToSignIn } from "@clerk/nextjs"
import { auth } from '@clerk/nextjs/server'


import { Inter } from "next/font/google"
import "../globals.css"
import LeftSideBar from "../../components/layout/LeftSideBar"
import RightSideBar from "../../components/layout/RightSideBar"
import Topbar from "../../components/layout/Topbar"
import MainContainer from "../../components/layout/MainContainer"
import BottomBar from "../../components/layout/BottomBar"





export const metadata = {
  title: 'Musikto',
  description: 'Musical Social Media',
}
const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({ children }) {


  const { userId } = await auth();
  if (!userId) {
    return <ClerkProvider>
      <html><body><RedirectToSignIn /></body></html>

    </ClerkProvider>; // Chuyển hướng đến trang đăng nhập nếu không có userId
  } else { }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-light-1`}>
          <main className="flex flex-col min-h-screen">
            <Topbar />
            <div className="flex flex-col md:flex-row flex-grow ">
              <div className="hidden md:basis-1/4 md:block"><LeftSideBar /></div>
              <div className="basis-full md:basis-1/2"><MainContainer>
                {children}
              </MainContainer>  </div>
              <div className=" hidden md:basis-1/4 md:block"><RightSideBar /></div>





            </div>
            <BottomBar />
          </main>

        </body>
      </html>
    </ClerkProvider>
  )
}
