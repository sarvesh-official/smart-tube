"use client"
import NavBar from "@/components/NavBar"
import SearchResults from "@/components/SearchResults";
import SideBar from "@/components/SideBar"
import VideosPage from "@/components/VideosPage";
import { useYoutube } from "@/contexts/YoutubeContext";
import { useParams } from "next/navigation";

const PlaylistVideos = () => {

    const {id} : {id : string} = useParams();
    const { searchResults } = useYoutube();
  return (
    <div className="flex flex-col h-full w-full">
      <NavBar/>

      <div className="flex overflow-hidden justify-evenly">
        <SideBar/>
        {
          searchResults.length > 0 ? <SearchResults /> :  <VideosPage playlistId={id}/>
        }
       
      </div>
    </div>
  )
}

export default PlaylistVideos