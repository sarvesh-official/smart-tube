"use client"

import { useYoutube } from "@/contexts/YoutubeContext"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import VideoCard from "./VideoCard";
import Skeleton from "./Skeleton";

const HomePage = () => {
    const { data: session } = useSession();
    const { playlistVideos, fetchPlaylistVideos, loading } = useYoutube();
    
    useEffect(() => {
        fetchPlaylistVideos(session);
    }, [session, fetchPlaylistVideos]);
    
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {[...Array(8)].map((_, index) => (
                    <Skeleton key={index} />
                ))}
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {playlistVideos && playlistVideos.length > 0 ? (
                playlistVideos.map((video) => (
                    <VideoCard key={video._id || video.id} video={video} />
                ))
            ) : (
                <div className="col-span-full text-center text-gray-400 text-lg">
                    No videos available
                </div>
            )}
        </div>
    );
}

export default HomePage;