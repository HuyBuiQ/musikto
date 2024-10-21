import {Inter} from "next/font/google"
import "../globals.css"
// import {Clerk} from "@clerk/nextjs/dist/types/server"
import { ClerkProvider } from "@clerk/nextjs"
export const metadata = {
    title: 'Musikto',
    description: 'Musikto - Next 14 Social Media App',
  }

  //Font
  const inter = Inter({subsets:["latin"]})
  
  export default function RootLayout({ children }) {
    return (
      <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-light-1`}>{children}</body>
      </html>
      </ClerkProvider>
    )
  }
  