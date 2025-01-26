"use client";

import { PlaylistItem } from "@/types/playlist";
import { Session } from "next-auth";
import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface YoutubeContextType {
  playlists: PlaylistItem[];
  playlistVideos: any[]; // temporarily use any[], update with proper type later
  loading: boolean;
  error: string | null;
  fetchPlaylists: (session: Session | null) => Promise<void>;
  fetchPlaylistVideos: (session: Session | null, playlistId?: string) => Promise<void>;
}

export const BACKEND_URL = "http://localhost:5000"

const YoutubeContext = createContext<YoutubeContextType | undefined>(undefined);

export function YoutubeProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [playlistVideos, setPlaylistVideos] = useState<any[]>([]); // initialize with empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchPlaylists = useCallback(async (session: Session | null) => {
      if (!session?.accessToken) return;

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/youtube/getPlaylists`, {
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
      setPlaylists(data.data.playlists || []);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching playlists:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlaylistVideos = useCallback(async (session: Session | null, playlistId?: string) => {
    if (!session?.accessToken) return;
    
    setLoading(true);
    try {
      // If no specific playlistId is provided, fetch playlists first
      if (!playlistId) {
        const playlistResponse = await fetch(`${BACKEND_URL}/api/youtube/getPlaylists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ session })
        });

        if (!playlistResponse.ok) {
          const errorData = await playlistResponse.json();
          throw new Error(errorData.error || "Failed to fetch playlists");
        }

        const playlistData = await playlistResponse.json();
        const playlists = playlistData.data.playlists || [];
        setPlaylists(playlists);

        if (playlists.length === 0) {
          throw new Error("No playlists available");
        }

        // Use the first playlist's ID from the response data
        playlistId = playlists[0].id;
      }

      // Now fetch the playlist videos
      const response = await fetch(`${BACKEND_URL}/api/youtube/getPlaylistVideos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ playlistId, session })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch playlist videos");
      }

      const data = await response.json();
      if (data.data && Array.isArray(data.data.videos)) {
        setPlaylistVideos(data.data.videos);
      } else {
        console.error('Unexpected response format:', data);
        setPlaylistVideos([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching playlist videos:", err);
      setPlaylistVideos([]); // Reset on error
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <YoutubeContext.Provider
      value={{
        playlists,
        playlistVideos,
        loading,
        error,
        fetchPlaylists,
        fetchPlaylistVideos
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
}

export function useYoutube() {
  const context = useContext(YoutubeContext);
  if (context === undefined) {
    throw new Error("useYoutube must be used within a YoutubeProvider");
  }
  return context;
} 