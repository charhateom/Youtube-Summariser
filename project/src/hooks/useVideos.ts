import { useEffect, useState } from 'react';
import { nhost } from '../lib/nhost';
import type { Video, VideoInput } from '../types/video';

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      const { data, error } = await nhost.graphql.request(`
        query GetVideos {
          videos {
            id
            youtube_url
            summary
            created_at
            user_id
          }
        }
      `);

      if (error) {
        setError(error.message);
      } else {
        setVideos(data.videos);
      }
    } catch (err) {
      setError('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const addVideo = async (input: VideoInput) => {
    try {
      const { data, error } = await nhost.graphql.request(`
        mutation AddVideo($youtube_url: String!) {
          insert_videos_one(object: { youtube_url: $youtube_url }) {
            id
            youtube_url
            summary
            created_at
            user_id
          }
        }
      `, { youtube_url: input.youtube_url });

      if (error) {
        setError(error.message);
      } else {
        setVideos([...videos, data.insert_videos_one]);
      }
    } catch (err) {
      setError('Failed to add video');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return {
    videos,
    loading,
    error,
    addVideo,
    refreshVideos: fetchVideos
  };
}