"use client";

import { useYoutube } from "@/contexts/YoutubeContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Skeleton from "./Skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { data: session } = useSession();
  const { allVideos, fetchAllVideos, loading, isOpen } = useYoutube();

  const router = useRouter()

  useEffect(() => {
    if (session && allVideos.length === 0) {
      fetchAllVideos(session);
    }
  }, [session, fetchAllVideos, allVideos.length]);

  if (loading && allVideos.length == 0) {
    return (
      <div
        className={`pl-3 pt-4 grid grid-cols-1 h-screen md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 ${
          isOpen ? "xl:grid-cols-3  w-4/5" : "xl:grid-cols-4 w-screen"
        }  overflow-y-scroll custom-scrollbar pb-52`}
      >
        {" "}
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div
    className={`pt-4 grid grid-cols-1 h-screen md:grid-cols-1 lg:grid-cols-2 gap-1 ${
      isOpen ? "xl:grid-cols-3  w-4/5" : "xl:grid-cols-4  w-screen"
    }  overflow-y-scroll custom-scrollbar pb-52`}
    >
      {allVideos && allVideos.length > 0 ? (
        allVideos.map((video) => (
          <div key={`${video.videoId}-${video.playlistId}-${Math.random() * 43}`} className="p-3 cursor-pointer" onClick={ () =>{
          
            router.push(`/watch/${video.videoId}`)
          }}>
            <Image
              className="rounded-lg"
              src={
                video.thumbnail?.maxres?.url ||
                video.thumbnail?.high?.url ||
                "/images/image-not-found.png"
              }
              width={300}
              height={300}
              alt={"hello"}
            />
            <h1 className="text-white">{video.title}</h1>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400 text-lg">
          No videos available
        </div>
      )}
    </div>
  );
};

export default HomePage;
