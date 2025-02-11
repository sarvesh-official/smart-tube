"use client";

import { useYoutube } from "@/contexts/YoutubeContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import DescriptionBox from "./DescriptionBox";
import VideoSkeleton from "./VideoSkeleton";

const VideoRender = ({
  isOpen,
  videoId
}: {
  isOpen: boolean;
  videoId: string;
}) => {
  const { data: session } = useSession();
  const { watchVideo, fetchVideo, loading } = useYoutube();

  useEffect(() => {
    if (session && videoId  ) {
      fetchVideo(session, videoId);
    }
  }, [session, videoId, fetchVideo]);

  if (loading || !watchVideo) {
    return <VideoSkeleton isOpen={isOpen} />;
  }

  return (
    <div className={`overflow-y-scroll custom-scrollbar ${
          isOpen ? "w-4/5" : "w-screen"
        } pt-6 p-4`}>
      <div>
        {watchVideo ? (
          <div className="text-white w-full">
            <div className="rounded-xl w-3/5">
              <iframe
              className={`rounded-xl ${ isOpen ? "w-[560px] h-[350px]" : "w-[683px] h-[400px]"}`}
             
                src={`https://www.youtube.com/embed/${watchVideo.videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            <h1 className="font-semibold text-xl w-auto my-2">{watchVideo.title}</h1>
            {watchVideo.description &&
             <DescriptionBox description={watchVideo.description}/>
            }
            </div>
          </div>
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No videos available
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default VideoRender;
