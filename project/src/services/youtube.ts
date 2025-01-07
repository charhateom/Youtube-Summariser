// Import necessary types
import { isValidYouTubeUrl } from '../utils/validation';
import type { VideoSummaryResponse } from '../types/api';

// Define the function
export async function getVideoSummary(url: string): Promise<VideoSummaryResponse> {
  if (!isValidYouTubeUrl(url)) {
    throw new Error('Invalid YouTube URL');
  }

  const response = await fetch('http://localhost:5000/api/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate summary');
  }

  return response.json();
}
