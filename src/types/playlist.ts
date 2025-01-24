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
  