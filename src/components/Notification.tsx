"use client";
import  { useEffect } from "react";
import { useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} type="button">
        <IoMdNotificationsOutline color="white" size={24} />
      </button>
      <div className="relative" ref={dropdownRef}>
        {isOpen == true && (
          <div className="absolute text-white text-center right-0 z-10 mt-[45px] w-44 border-border-1 rounded-lg shadow-lg bg-violet-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
           <h1 className="text-md py-2">Notifications</h1>
           <hr />
            <div className="px-4 py-2 mt-2 text-sm">
              <div className="truncate">no new notifications </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
