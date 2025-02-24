"use client";

import NavBar from "@/components/NavBar";
import SearchResults from "@/components/SearchResults";
import SideBar from "@/components/SideBar";
import VideoRender from "@/components/VideoRender";
import { useYoutube } from "@/contexts/YoutubeContext";
import { useParams } from "next/navigation";

const WatchVideo = () => {
  const { id }: { id: string } = useParams();
  const { searchResults } = useYoutube();
  return (
    <div className="flex flex-col h-full w-full">
      <NavBar/>

      <div className="flex overflow-hidden justify-evenly h-full">
        <SideBar/>
        {
          searchResults.length > 0 ? <SearchResults /> : <VideoRender videoId={id}/>
        }
        
      </div>
    </div>
  );
};

export default WatchVideo;
