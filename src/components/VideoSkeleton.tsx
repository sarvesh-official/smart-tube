const VideoSkeleton = ({ isOpen }: { isOpen: boolean }) => {
    return (
      <div
        className={`overflow-y-scroll custom-scrollbar ${
          isOpen ? "w-4/5" : "w-screen"
        } pt-6 p-4`}
      >
        <div className="text-white w-full">
          {/* Video Skeleton */}
          <div className="rounded-xl bg-gray-800 animate-pulse w-3/5">
            <div
              className={`rounded-xl bg-gray-700 animate-pulse ${
                isOpen ? "w-[560px] h-[350px]" : "w-[683px] h-[400px]"
              }`}
            ></div>
          </div>
  
          {/* Title Skeleton */}
          <div className="h-6 w-3/5 bg-gray-700 animate-pulse mt-4 rounded"></div>
  
          {/* Description Skeleton */}
          <div className="mt-2">
            <div className="h-4 w-4/5 bg-gray-700 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-3/5 bg-gray-700 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-2/5 bg-gray-700 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default VideoSkeleton;
  