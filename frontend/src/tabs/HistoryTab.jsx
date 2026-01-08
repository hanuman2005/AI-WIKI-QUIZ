// HistoryTab component
import React, { useState, useEffect } from 'react';
import { getQuizHistory, getQuizById } from '../services/api';
import Modal from '../components/Modal';
import QuizDisplay from '../components/QuizDisplay';

const HistoryTab = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getQuizHistory();
      setHistory(data);
      setError('');
    } catch (err) {
      setError('Failed to load quiz history');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (quizId) => {
    try {
      setModalLoading(true);
      setIsModalOpen(true);
      const data = await getQuizById(quizId);
      setSelectedQuiz(data);
    } catch (err) {
      setError('Failed to load quiz details');
      setIsModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-md text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-4 border-blue-600 mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading quiz history...</p>
        </div>
      </div>
    );
  }

  if (error && !isModalOpen) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-sm sm:text-base">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Quiz History</h2>
          <p className="text-blue-100 mt-1 text-sm sm:text-base">
            {history.length} {history.length === 1 ? 'quiz' : 'quizzes'} generated
          </p>
        </div>

        {history.length === 0 ? (
          <div className="p-8 sm:p-12 text-center text-gray-500">
            <svg
              className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3 sm:mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-base sm:text-lg font-medium">No quizzes generated yet</p>
            <p className="text-xs sm:text-sm mt-2">
              Go to "Generate Quiz" tab to create your first quiz!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Mobile Card View */}
            <div className="block sm:hidden">
              {history.map((quiz) => (
                <div key={quiz.id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500">#{quiz.id}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(quiz.date_generated).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm mb-2">{quiz.title}</h3>
                  <a
                    href={quiz.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate block mb-3"
                  >
                    {quiz.url}
                  </a>
                  <button
                    onClick={() => handleViewDetails(quiz.id)}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
            {/* Desktop Table View */}
            <table className="w-full hidden sm:table">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    URL
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Date Generated
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{quiz.id}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 font-medium">
                      <span className="line-clamp-2">{quiz.title}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-blue-600 hidden md:table-cell">
                      <a
                        href={quiz.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline truncate block max-w-xs"
                      >
                        {quiz.url}
                      </a>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      {new Date(quiz.date_generated).toLocaleString()}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(quiz.id)}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs sm:text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Quiz Details */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedQuiz?.title || 'Quiz Details'}
      >
        {modalLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading quiz details...</p>
          </div>
        ) : (
          selectedQuiz && <QuizDisplay quizData={selectedQuiz} />
        )}
      </Modal>
    </div>
  );
};

export default HistoryTab;