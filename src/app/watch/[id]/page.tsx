"use client";

import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import VideoRender from "@/components/VideoRender";
import { useParams } from "next/navigation";
import { useState } from "react";

const WatchVideo = () => {
  const { id }: { id: string } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-full w-full">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex overflow-hidden justify-evenly h-full">
        <SideBar isOpen={isOpen} />
        <VideoRender isOpen={isOpen} videoId={id}/>
      </div>
    </div>
  );
};

export default WatchVideo;
