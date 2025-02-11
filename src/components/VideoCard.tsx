import Image from "next/image";

interface VideoCardProps {
  video: {
    snippet: {
      title: string;
      thumbnails: {
        high: {
          url: string;
        },
        maxres: {
          url: string;
        };
      };
      description: string;
    };
  };
}

const VideoCard = ({ video }: VideoCardProps) => {
  
  return (
    <div className="flex flex-col w-80 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 m-4">
      <div className="relative h-44 w-full">
        <Image
          src={"https://i.ytimg.com/vi/4pbtLGl9790/maxresdefault.jpg" }
          alt={video.snippet.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg line-clamp-2 mb-2">
          {video.snippet.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">
          {video.snippet.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard; 