// GenerateQuizTab component
import React, { useState } from 'react';
import { generateQuiz } from '../services/api';
import QuizDisplay from '../components/QuizDisplay';

const GenerateQuizTab = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizData, setQuizData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate URL
    if (!url.trim()) {
      setError('Please enter a Wikipedia URL');
      return;
    }

    if (!url.startsWith('https://en.wikipedia.org/wiki/')) {
      setError('Please enter a valid English Wikipedia URL (https://en.wikipedia.org/wiki/...)');
      return;
    }

    setError('');
    setLoading(true);
    setQuizData(null);

    try {
      const data = await generateQuiz(url);
      setQuizData(data);
      setUrl(''); // Clear input after success
    } catch (err) {
      setError(err.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Generate Quiz from Wikipedia
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Wikipedia Article URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://en.wikipedia.org/wiki/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <p className="mt-2 text-sm text-gray-500">
              Example: https://en.wikipedia.org/wiki/Python_(programming_language)
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Generating Your Quiz...
          </h3>
          <p className="text-gray-600">
            Scraping Wikipedia article and creating questions with AI. This may take 20-30 seconds.
          </p>
        </div>
      )}

      {/* Quiz Display */}
      {!loading && quizData && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Generated Quiz</h3>
            <span className="text-sm text-gray-500">
              ID: {quizData.id} | Generated: {new Date(quizData.date_generated).toLocaleString()}
            </span>
          </div>
          <QuizDisplay quizData={quizData} />
        </div>
      )}
    </div>
  );
};

export default GenerateQuizTab;