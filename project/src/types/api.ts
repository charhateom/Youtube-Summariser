export interface VideoSummaryResponse {
  summary: string;
  title: string;
  duration: string;
  error?: string;
}

export interface ApiError {
  message: string;
  code: string;
}