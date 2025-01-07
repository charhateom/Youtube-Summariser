import { useState } from 'react';
import { getVideoSummary } from '../services/youtube';
import type { VideoSummaryResponse } from '../types/api';

export function useSummary() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<VideoSummaryResponse | null>(null);

  const generateSummary = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getVideoSummary(url);
      setSummary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    summary,
    generateSummary
  };
}