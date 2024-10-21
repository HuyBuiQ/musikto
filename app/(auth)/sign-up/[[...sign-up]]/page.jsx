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
                        src="images/women_music_producer.jpg"
                        alt="cover"
                        className="hidden xl:block h-screen w-full object-cover bg-no-repeat"

                    />
                </div>
            </div>




        </div>

    )
}