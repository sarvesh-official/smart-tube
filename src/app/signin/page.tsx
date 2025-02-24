"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaYoutube } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const SignIn = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-full text-white">
      <div className="p-8 shadow-lg w-80 bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="flex flex-col items-center mb-4">
          <FaYoutube color="#BA6EF2" size={40} />
          <h1 className="text-white font-youtube text-2xl">SmartTube</h1>
        </div>
        {session?.user ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Hi, {session.user.name}</h2>
            <p className="mb-4">Welcome back to Smart Tube!</p>
            <button
              onClick={() => signOut()}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Log Out
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4 items-center">
              <p className="mb-4 text-center">
              Welcome to Smart Tube! Please sign in to continue.
            </p>
            <button
              onClick={() => signIn("google")}
              className="w-full bg-[#BA6EF2] text-white py-2 px-4 rounded hover:bg-[#b458f7] transition duration-200"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
