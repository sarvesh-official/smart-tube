"use client"
import HomePage from "@/components/HomePage";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import SearchResults from "@/components/SearchResults";
import { useYoutube } from "@/contexts/YoutubeContext";

const HomeScreen = () => {
  const { searchResults } = useYoutube();
  
  return (
    <div className="flex flex-col h-full w-full">
      <NavBar/>
      <div className="flex overflow-hidden h-screen">
        <SideBar />
        {
          searchResults.length > 0 ? <SearchResults /> : <HomePage />
        }
      </div>
    </div>
  );
};

export default HomeScreen;