import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div>
            <div className="flex h-screen">
              
                <div className="w-1/2 bg-white flex items-center justify-center">
                    <SignUp />
                </div>

                
                <div className="w-1/2 flex items-center justify-center">
                    <img
                        src="https://miro.medium.com/v2/resize:fit:1400/1*iavfvAjS2XQ4wJqZRT8t9Q.jpeg"
                        alt="cover"
                        className="hidden xl:block h-screen w-full object-cover bg-no-repeat"

                    />
                </div>
            </div>




        </div>

    )
}