"use client"
import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar"
import VideosPage from "@/components/VideosPage";
import { useParams } from "next/navigation";
import { useState } from "react";

const PlaylistVideos = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {id} : {id : string} = useParams();
  return (
    <div className="flex flex-col h-full w-full">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex overflow-hidden justify-evenly">
        <SideBar isOpen={isOpen} />
        <VideosPage isOpen={isOpen} playlistId={id}/>
      </div>
    </div>
  )
}

export default PlaylistVideos