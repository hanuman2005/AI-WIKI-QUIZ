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
    
    // Trim whitespace from URL
    const trimmedUrl = url.trim();
    
    // Validate URL
    if (!trimmedUrl) {
      setError('Please enter a Wikipedia URL');
      return;
    }

    if (!trimmedUrl.startsWith('https://en.wikipedia.org/wiki/')) {
      setError('Please enter a valid English Wikipedia URL (https://en.wikipedia.org/wiki/...)');
      return;
    }

    setError('');
    setLoading(true);
    setQuizData(null);

    try {
      const data = await generateQuiz(trimmedUrl);
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
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Generate Quiz from Wikipedia
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Wikipedia Article URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://en.wikipedia.org/wiki/..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 break-all">
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
        <div className="bg-white p-6 sm:p-12 rounded-lg shadow-md text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-blue-600 mb-3 sm:mb-4"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Generating Your Quiz...
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Scraping Wikipedia article and creating questions with AI. This may take 20-30 seconds.
          </p>
        </div>
      )}

      {/* Quiz Display */}
      {!loading && quizData && (
        <div className="bg-gray-50 p-3 sm:p-6 rounded-lg">
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Generated Quiz</h3>
            <span className="text-xs sm:text-sm text-gray-500">
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