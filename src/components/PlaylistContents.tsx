"use client"

import { useYoutube } from '@/contexts/YoutubeContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const PlaylistContents = () => {

    const {playlistVideos} = useYoutube()
    const router = useRouter();

  return (
    <div className="bg-violet-400 min-w-96 xl:max-h-[400px] bg-opacity-20 backdrop-blur-lg backdrop-filter text-white p-4 rounded-lg shadow-lg overflow-y-scroll custom-scrollbar">
        
        {playlistVideos && playlistVideos.length > 0 ? (
        playlistVideos.map((video) => (
            <div  key={video.id} className=''>
          <div className="py-2 px-1 cursor-pointer flex gap-2 hover:scale-105 hover:bg-violet-300 hover:bg-opacity-20 rounded-lg" onClick={() => {
            router.push(`/watch/${video.snippet.resourceId.videoId}`)
          }}>
            <Image
              className="rounded-lg"
              src={
                video.snippet.thumbnails?.maxres?.url ||
                video.snippet.thumbnails?.high?.url ||
                "/images/image-not-found.png"
              }
              width={100}
              height={50}
              alt={"hello"}
            />
            <h1 className="text-white text-sm">{video.snippet.title}</h1>
          </div>
            {/* <hr className='border-violet-400 border-dashed' /> */}
            </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400 text-lg">
          No videos available
        </div>
      )}
    </div>
  )
}

export default PlaylistContents