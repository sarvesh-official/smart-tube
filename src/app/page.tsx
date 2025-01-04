"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      maxres: { url: string };
    };
  };
}

export default function Page() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      if (session?.accessToken) {
        setLoading(true);
        try {
          const response = await fetch('/api/youtube/playlists', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch playlists');
          }

          const data = await response.json();
          console.log("Fetched playlists:", data); // Debug log
          setPlaylists(data.items || []);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error("Error fetching playlists:", err);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchPlaylists();
  }, [session]);

  if (!session) {
    return <div>Not signed in</div>;
  }

  if (loading) {
    return <div>Loading playlists...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your YouTube Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div 
            key={playlist.id} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <Image 
              src={playlist.snippet.thumbnails.maxres?.url || playlist.snippet.thumbnails.default.url} 
              alt={playlist.snippet.title}
              width={1000}
              height={1000}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h2 className="font-semibold">{playlist.snippet.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {playlist.snippet.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
