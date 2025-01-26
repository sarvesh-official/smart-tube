"use client";

import { PlaylistItem } from "@/types/playlist";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgPlayList } from "react-icons/cg";

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPlaylists() {
      if (session?.accessToken) {
        setLoading(true);
        try {
          const response = await fetch("/api/youtube/playlists", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ session })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch playlists");
          }

          const data = await response.json();
          console.log("Fetched playlists:", data);
          setPlaylists(data.items || []);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
          console.error("Error fetching playlists:", err);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchPlaylists();
  }, [session]);
  async function fetchPlaylistVideos(playlistId : string) {
    if (session?.accessToken) {
      setLoading(true);
      try {
        const response = await fetch("/api/youtube/playlistVideos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ session, playlistId })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch playlists");
        }

        const data = await response.json();
        console.log("Fetched playlist videos:", data); // Debug log
        setPlaylists(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching playlists:", err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {isOpen === true ? (
        <>

          <div className="w-1/6 rounded-bl-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20">
            <div className="flex flex-col gap-3 h-full px-2 pt-3 custom-scrollbar overflow-y-scroll">
              {playlists.map((playlist) => (
                  <div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  key={playlist.id}
                  onClick={()=>{
                    fetchPlaylistVideos(playlist.id)
                  }}
                  >
                  
                    <Image
                      src={
                          playlist.snippet.thumbnails.high.url ||
                          playlist.snippet.thumbnails.default.url
                        }
                        alt="thumbnail"
                        height={1000}
                        width={1000}
                        className="rounded-md object-cover"
                        />
                    <p className="text-md font-semibold text-center text-white">
                      {playlist.snippet.title}
                    </p>
                  <hr />
                </div>
              ))}
              </div>
            </div>
          {/* </div> */}
        </>
      ) : (
        <>
          <div
            className="h-full flex-col w-14 py-3 rounded-bl-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 
"
          >
            <div className="flex flex-col gap-5">
              {playlists.map((playlist) => (
                  <div
                  className="relative flex flex-col items-center justify-center cursor-pointer group"
                  key={playlist.id}
                >
                  {/* Icon */}
                  <div className="rounded-full object-scale-down">
                    <CgPlayList color="white" size={25} />
                  </div>
        
                  {/* Tooltip */}
                  <div
                    className="absolute bottom-[-35px] z-30 left-1/2 transform -translate-x-1/2 w-full px-2 py-1 rounded-md bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                   <h1 className=""> {playlist.snippet.title}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
