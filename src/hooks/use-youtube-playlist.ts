import {useState, useEffect} from 'react';

interface YouTubePlaylistItem {
  type: 'youtube';
  videoId: string;
  title: string;
}

interface UseYouTubePlaylistResult {
  entries: YouTubePlaylistItem[];
  loading: boolean;
  error: string | null;
}

const YOUTUBE_PLAYLIST_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

const useYouTubePlaylist = (playlistId: string, apiKey: string): UseYouTubePlaylistResult => {
  const [entries, setEntries] = useState<YouTubePlaylistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPlaylist = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${YOUTUBE_PLAYLIST_API}?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setEntries(
            (data.items || []).map(
              (item: {snippet: {title: string; resourceId: {videoId: string}}}) => ({
                type: 'youtube' as const,
                videoId: item.snippet.resourceId.videoId,
                title: item.snippet.title,
              })
            )
          );
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch YouTube playlist');
          setLoading(false);
        }
      }
    };

    fetchPlaylist();

    return () => {
      cancelled = true;
    };
  }, [playlistId, apiKey]);

  return {entries, loading, error};
};

export {useYouTubePlaylist, type YouTubePlaylistItem};
