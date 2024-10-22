import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="flex h-screen">
            {/* Sign In Form */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
                <SignIn />
            </div>

            {/* Image Section */}
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img
                    src="images/women_music_producer.jpg"
                    alt="cover"
                    className="h-screen w-full object-cover bg-no-repeat"
                />
            </div>
        </div>
    );
}
