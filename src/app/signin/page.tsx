"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import 'tailwindcss/tailwind.css'

const SignIn = () => {
  const {data: session} = useSession();

  return (
    <div className="flex items-center justify-center h-full text-white">
      <div className="p-8 rounded-lg shadow-lg w-80">
        {session?.user ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Hi, {session.user.name}</h1>
            <button 
              onClick={() => signOut()} 
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Log Out
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
            <button  
              onClick={() => signIn("google")} 
              className="w-full bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-300 transition duration-200"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignIn