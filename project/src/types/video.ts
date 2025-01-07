export interface Video {
  id: string;
  youtube_url: string;
  summary: string | null;
  created_at: string;
  user_id: string;
}

export interface VideoInput {
  youtube_url: string;
}