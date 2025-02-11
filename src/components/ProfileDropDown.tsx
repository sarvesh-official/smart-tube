"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileDropDown = () => {
  const {data : session, status} = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if(status == "loading"){
    return (
      <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-white rounded hover:text-yellow-400 focus:outline-none"
      >
        <FaUserCircle size={32} color="black"/>
      </button>

      {isOpen && (
        <div className="bg-primary-1 absolute left-2 text-violet-400 right-0 z-10 mt-3 w-44 border-border-1 rounded-lg shadow-lg">
          <div className="px-4 py-3 text-sm">
            <div className="truncate ">loading</div>
          </div>
          <div className="px-4 py-3 text-sm">
            <div className="truncate">loading</div>
          </div>
          
        </div>
      )}
    </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-white rounded focus:outline-none"
      >
        <Image
          className="w-8 h-8 me-2 rounded-full"
          src={session?.user?.image || ""}
          alt="User photo"
          width={32}
          height={32}
        />
      </button>

      {isOpen && (
        <div className="absolute text-center text-white right-0 z-10 mt-[13px] w-44 border-border-1 rounded-lg shadow-lg bg-violet-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40">
         
          <div className="px-4 py-3 text-sm">
            <div className="truncate">{session?.user?.name}</div>
          </div>
          <hr />
          <div className="px-4 py-3 text-sm">
            <div className="truncate">{session?.user?.email}</div>
          </div>
          <hr /> 
            <button
              onClick={()=> signOut()}
              className="block w-full px-4 py-2 text-sm bg-[#BA6EF2] rounded-b-md"
            >
              <p className="font-semibold">
              Sign out
              </p>
            </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
