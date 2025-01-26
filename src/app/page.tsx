"use client"

import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { useState } from "react";

const HomeScreen = () => {
  const [isOpen,setIsOpen] =useState(false);

  return (
    <div className="flex flex-col h-full w-full">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="flex h-full
      overflow-hidden">
         <SideBar isOpen={isOpen}/>
      </div>
    </div>
  );
};

export default HomeScreen;
