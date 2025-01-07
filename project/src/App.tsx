import React from 'react';
import { Layout } from './components/Layout';
import { URLInput } from './components/URLInput';
import { Summary } from './components/Summary';
import { useSummary } from './hooks/useSummary';
import { Youtube } from 'lucide-react';

export default function App() {
  const { loading, error, summary, generateSummary } = useSummary();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Youtube className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YouTube Video Summarizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant AI-powered summaries of any YouTube video. Save time and extract key insights quickly.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-8">
          <URLInput onSubmit={generateSummary} disabled={loading} />
          <Summary loading={loading} error={error} summary={summary} />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quick Summaries',
              description: 'Get concise summaries of long videos in seconds'
            },
            {
              title: 'Key Points',
              description: 'Extract the most important information automatically'
            },
            {
              title: 'Time Saving',
              description: 'Make informed decisions about which videos to watch fully'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}