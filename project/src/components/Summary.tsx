import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import type { VideoSummaryResponse } from '../types/api';

interface SummaryProps {
  loading?: boolean;
  error?: string | null;
  summary?: VideoSummaryResponse | null;
}

export function Summary({ loading, error, summary }: SummaryProps) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl bg-red-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 text-red-600 mb-4">
          <AlertCircle className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Error</h2>
        </div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Video Summary</h2>
        </div>
        <p className="text-gray-600">
          Enter a YouTube URL above to generate a summary of the video content.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">{summary.title}</h2>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        Duration: {summary.duration}
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{summary.summary}</p>
    </div>
  );
}