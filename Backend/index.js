const express = require('express');
const bodyParser = require('body-parser');
const { YoutubeTranscript } = require('youtube-transcript');
const cors = require('cors');
const he = require('he'); // To decode HTML entities
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Access environment variables
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;

if (!OPENROUTER_API_KEY || !OPENROUTER_API_URL) {
  console.error('ERROR: Missing environment variables. Check your .env file.');
  process.exit(1);
}

// Function to extract video ID
function extractVideoId(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'www.youtube.com' && parsedUrl.hostname !== 'youtu.be') {
      return null; // Not a YouTube URL
    }

    if (parsedUrl.pathname === '/watch') {
      return parsedUrl.searchParams.get('v'); // Extract `v` parameter
    }

    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1); // Extract path for shortened URLs
    }

    return null; // Not a video URL
  } catch (err) {
    return null; // Invalid URL
  }
}

// Basic Extractive Summarization
function summarizeText(text, sentenceCount = 5) {
  const sentences = text.split('. ');
  if (sentences.length <= sentenceCount) {
    return text; // Return the full text if it's already short
  }

  // Rank sentences by length (as a simple heuristic)
  const rankedSentences = sentences
    .map((sentence) => ({ sentence, length: sentence.length }))
    .sort((a, b) => b.length - a.length);

  // Select top-ranked sentences
  const summary = rankedSentences.slice(0, sentenceCount).map((item) => item.sentence).join('. ');

  return summary;
}



// Function to summarize text using OpenRouter API and the Gemini model
async function summarizeWithGemini(text) {
    try {
      // Check if the input text is valid
      if (!text || text.trim().length === 0) {
        throw new Error('Input text is empty or invalid');
      }
  
      const response = await axios.post(OPENROUTER_API_URL, {
        model: 'google/gemini-2.0-flash-thinking-exp:free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: text,
              },
            ],
          },
        ],
      }, {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Log the full response for debugging
      console.log('OpenRouter API response:', response.data);
  
      // Check if the response contains choices and handle accordingly
      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content;  // Return the summary text
      } else {
        throw new Error('AI summarization failed. No choices returned from OpenRouter.');
      }
  
    } catch (error) {
      console.error('Error summarizing with OpenRouter:', error.message);
      throw new Error('AI summarization failed');
    }
  }
  

// Route to summarize video transcript
app.post('/api/summarize', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'YouTube URL is required' });
    }

    const videoId = extractVideoId(url);

    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube video URL' });
    }

    // Fetch the transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // Combine transcript text
    const rawText = transcript.map((item) => he.decode(item.text)).join(' ');

    // Summarize text
    const data = summarizeText(rawText, 5); // Limit to 5 sentences

    // Summarize using OpenRouter AI's Gemini model
    const summary = await summarizeWithGemini(data);

    res.json({ summary });
  } catch (error) {
    console.error(error);
    if (error.message.includes('No transcripts found')) {
      return res.status(400).json({ error: 'Transcripts are disabled or unavailable for this video' });
    }
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
