"use client";

import { AllVideo, PlaylistItem, PlaylistVideo, WatchVideo } from "@/types/playlist";
import { Session } from "next-auth";
import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface YoutubeContextType {
  playlists: PlaylistItem[];
  playlistVideos: PlaylistVideo[];
  watchVideo: WatchVideo | null; 
  allVideos: AllVideo[];
  loading: boolean;
  error: string | null;
  fetchPlaylists: (session: Session | null) => Promise<void>;
  fetchPlaylistVideos: (session: Session | null, playlistId?: string) => Promise<void>;
  fetchVideo: (session: Session | null, videoId?: string) => Promise<void>;
  fetchAllVideos: (session: Session | null) => Promise<void>;
  searchResults: AllVideo[];
  setSearchResults: (results: AllVideo[]) => void;
  searchVideos: (session: Session | null, query: string) => Promise<void>;
  isSearchActive: boolean;
  setSearchActive: (active: boolean) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const YoutubeContext = createContext<YoutubeContextType | undefined>(undefined);

export function YoutubeProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [playlistVideos, setPlaylistVideos] = useState<PlaylistVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allVideos, setAllVideos] = useState<AllVideo[]>([]); 
  const [watchVideo, setWatchVideo] = useState<WatchVideo | null>(null); 
  const [searchResults, setSearchResults] = useState<AllVideo[]>([]); 
  const [isSearchActive, setIsSearchActive] = useState(false); 
  const [isOpen, setIsOpen] = useState(false);
  const setSearchActive = (active: boolean) => {
    setIsSearchActive(active);
  };

  const fetchPlaylists = useCallback(async (session: Session | null) => {
    if (!session?.accessToken) return;

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/youtube/getPlaylists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session }),
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
      const response = await fetch(`${BACKEND_URL}/api/youtube/getPlaylistVideos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId, session }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch playlist videos");
      }

      const data = await response.json();
      setPlaylistVideos(Array.isArray(data.data.videos) ? data.data.videos : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching playlist videos:", err);
      setPlaylistVideos([]); // Reset on error
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllVideos = useCallback(async (session: Session | null) => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/youtube/getAllVideos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch all videos");
      }

      const data = await response.json();
      setAllVideos(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching all videos:", err);
      setAllVideos([]); // Reset on error
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVideo = useCallback(async (session: Session | null, videoId?: string) => {
    if (!session?.accessToken) return;
    setWatchVideo(null); // ✅ Correct Reset
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/youtube/getVideo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, session }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch video");
      }

      const data = await response.json();
      setWatchVideo(data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching video:", err);
      setWatchVideo(null); 
    } finally {
      setLoading(false);
    }
  }, []);

  const searchVideos = useCallback(async (session: Session | null, query: string) => {

    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/youtube/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, session }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to search videos");
      }

      const data = await response.json();
      setSearchResults(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error searching videos:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <YoutubeContext.Provider
      value={{
        playlists,
        allVideos,
        watchVideo,
        playlistVideos,
        fetchAllVideos,
        fetchVideo,
        loading,
        error,
        fetchPlaylists,
        fetchPlaylistVideos,
        searchResults,
        searchVideos,
        isSearchActive,
        setSearchActive,
        isOpen,
        setSearchResults,
        setIsOpen,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
}

export function useYoutube() {
  const context = useContext(YoutubeContext);
  if (!context) {
    throw new Error("useYoutube must be used within a YoutubeProvider");
  }
  return context;
}
