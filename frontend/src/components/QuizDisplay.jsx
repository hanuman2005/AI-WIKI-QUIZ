import React, { useState } from 'react';

const QuizDisplay = ({ quizData }) => {
  const [quizMode, setQuizMode] = useState('view'); // 'view' or 'take'
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quizData) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    if (!submitted) {
      setUserAnswers({
        ...userAnswers,
        [questionIndex]: selectedOption
      });
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizData.quiz.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleModeSwitch = (mode) => {
    setQuizMode(mode);
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2">{quizData.title}</h2>
        <p className="text-blue-100">{quizData.summary}</p>
      </div>

      {/* Mode Toggle Buttons */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleModeSwitch('view')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              quizMode === 'view'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📖 View Mode (Answers Shown)
          </button>
          <button
            onClick={() => handleModeSwitch('take')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              quizMode === 'take'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ✏️ Take Quiz Mode
          </button>
        </div>
      </div>

      {/* Key Entities Section */}
      {quizData.key_entities && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Key Entities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quizData.key_entities.people?.length > 0 && (
              <div>
                <h4 className="font-medium text-blue-600 mb-2">👤 People</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {quizData.key_entities.people.map((person, idx) => (
                    <li key={idx} className="text-sm">{person}</li>
                  ))}
                </ul>
              </div>
            )}
            {quizData.key_entities.organizations?.length > 0 && (
              <div>
                <h4 className="font-medium text-green-600 mb-2">🏢 Organizations</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {quizData.key_entities.organizations.map((org, idx) => (
                    <li key={idx} className="text-sm">{org}</li>
                  ))}
                </ul>
              </div>
            )}
            {quizData.key_entities.locations?.length > 0 && (
              <div>
                <h4 className="font-medium text-purple-600 mb-2">📍 Locations</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {quizData.key_entities.locations.map((loc, idx) => (
                    <li key={idx} className="text-sm">{loc}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sections */}
      {quizData.sections?.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Article Sections</h3>
          <div className="flex flex-wrap gap-2">
            {quizData.sections.map((section, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {section}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Questions */}
      {quizData.quiz?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">Quiz Questions</h3>

          {/* Score Display (Take Quiz Mode - After Submission) */}
          {quizMode === 'take' && submitted && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-md border-2 border-green-300">
              <h4 className="text-2xl font-bold text-green-700 mb-2">
                🎉 Quiz Completed!
              </h4>
              <p className="text-xl text-gray-800">
                Your Score: <span className="font-bold text-green-600">{score}</span> out of{' '}
                <span className="font-bold">{quizData.quiz.length}</span>
              </p>
              <p className="text-lg text-gray-600 mt-2">
                Percentage: {((score / quizData.quiz.length) * 100).toFixed(1)}%
              </p>
              <button
                onClick={handleResetQuiz}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                🔄 Retake Quiz
              </button>
            </div>
          )}

          {/* Questions */}
          {quizData.quiz.map((question, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-800 flex-1">
                  {idx + 1}. {question.question}
                </h4>
                <span
                  className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                    question.difficulty
                  )}`}
                >
                  {question.difficulty}
                </span>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {question.options?.map((option, optIdx) => {
                  const isCorrect = option === question.answer;
                  const isSelected = userAnswers[idx] === option;
                  const showResult = quizMode === 'view' || (quizMode === 'take' && submitted);

                  let optionClass = 'p-3 rounded-lg border-2 transition-all cursor-pointer ';

                  if (quizMode === 'view') {
                    // View Mode: Always show correct answer
                    optionClass += isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50';
                  } else if (quizMode === 'take') {
                    if (!submitted) {
                      // Before submission: Show selection
                      optionClass += isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 hover:border-blue-300';
                    } else {
                      // After submission: Show correct/incorrect
                      if (isCorrect) {
                        optionClass += 'border-green-500 bg-green-50';
                      } else if (isSelected && !isCorrect) {
                        optionClass += 'border-red-500 bg-red-50';
                      } else {
                        optionClass += 'border-gray-200 bg-gray-50';
                      }
                    }
                  }

                  return (
                    <div
                      key={optIdx}
                      className={optionClass}
                      onClick={() => handleAnswerSelect(idx, option)}
                    >
                      <span className="font-medium text-gray-700">
                        {String.fromCharCode(65 + optIdx)}. {option}
                      </span>
                      {showResult && isCorrect && (
                        <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>
                      )}
                      {quizMode === 'take' && submitted && isSelected && !isCorrect && (
                        <span className="ml-2 text-red-600 font-semibold">✗ Wrong</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation (Show in View Mode or After Submission in Take Mode) */}
              {(quizMode === 'view' || (quizMode === 'take' && submitted)) && (
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-blue-700">Explanation: </span>
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Submit Button (Take Quiz Mode - Before Submission) */}
          {quizMode === 'take' && !submitted && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                Answered: {Object.keys(userAnswers).length} / {quizData.quiz.length}
              </p>
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length !== quizData.quiz.length}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                  Object.keys(userAnswers).length === quizData.quiz.length
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {Object.keys(userAnswers).length === quizData.quiz.length
                  ? '✅ Submit Quiz'
                  : '⏳ Answer All Questions to Submit'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Related Topics */}
      {quizData.related_topics?.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-md border border-purple-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            📚 Related Topics for Further Reading
          </h3>
          <div className="flex flex-wrap gap-2">
            {quizData.related_topics.map((topic, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white text-purple-700 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;