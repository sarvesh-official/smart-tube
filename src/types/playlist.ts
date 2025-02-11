export interface PlaylistItem {
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        high: { url: string };
        maxres: { url: string };
      };
    };
  }
export interface playlistVideos {
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        high: { url: string };
        maxres: { url: string };
      };
    };
  }
  

  export type PlaylistVideo = {
    id: string;
    snippet: {
      title: string;
      description: string;
      resourceId: {
        videoId: string;
      };
      thumbnails: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
        maxres?: { url: string };
      };
    };
  };
  

 export type WatchVideo = {
    videoId: string;
    title: string;
    description: string;
    thumbnail: {
      default?: string;
      medium?: string;
      high?: string;
    };
    url: string;
    publishedAt: string; // ISO date string
  };


  export type AllVideo = {
    videoId: string;
    userEmail: string;
    title: string;
    description: string;
    thumbnail: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
      maxres?: { url: string };
    };
    resourceId: {
      videoId : string;
    };
    url: string;
    publishedAt: string; // ISO date string
  };