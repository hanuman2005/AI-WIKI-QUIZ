// Main App component
import React, { useState } from 'react';
import GenerateQuizTab from './tabs/GenerateQuizTab';
import HistoryTab from './tabs/HistoryTab';

function App() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            🧠 AI Wiki Quiz Generator
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Transform Wikipedia articles into engaging quizzes using AI
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6">
        <div className="flex space-x-2 sm:space-x-4 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'generate'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📝 Generate Quiz
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📚 Quiz History
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {activeTab === 'generate' ? <GenerateQuizTab /> : <HistoryTab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 text-center text-gray-600 text-sm sm:text-base">
          <p>
            Powered by <span className="font-semibold">FastAPI</span> +{' '}
            <span className="font-semibold">Google Gemini</span> +{' '}
            <span className="font-semibold">React</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;