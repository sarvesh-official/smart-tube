"use client"
import { FaSearch, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useYoutube } from "@/contexts/YoutubeContext";
import { useSession } from "next-auth/react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchVideos, setSearchResults } = useYoutube();
  const { data: session } = useSession(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    searchVideos(session, query);
  };

  const handleClear = () => {
    setQuery("");
    setSearchResults([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-violet-600 rounded-full w-1/3 pl-3 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 flex justify-between">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="bg-transparent w-full pr-1 focus:outline-none text-white"
      />
      <div className="flex items-center h-full"> 
        {query && (
          <FaTimes
          onClick={handleClear}
          className="mr-2 cursor-pointer hover:scale-110 text-white"
          />
        )}
        {/* {searchResults.length > 0 && (
          <FaTrash
            onClick={handleClear}
            className="mr-2 cursor-pointer hover:scale-110 text-white"
          />
        )} */}
        </div>
        <button onClick={handleSubmit} className="bg-violet-600 backdrop-blur-md bg-opacity-20 rounded-r-full py-1 px-2 flex items-center justify-center cursor-pointer hover:scale-105">
          <FaSearch color="white" size={20} />
        </button>
    </form>
  );
};
