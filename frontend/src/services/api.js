// API service functions
// API service functions for communicating with FastAPI backend

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Generate a quiz from a Wikipedia URL
 * @param {string} url - Wikipedia article URL
 * @returns {Promise<Object>} Quiz data
 */

export const generateQuiz = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to generate quiz");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

/**
 * Get list of all generated quizzes
 * @returns {Promise<Array>} Array of quiz history items
 */

export const getQuizHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);

    if (!response.ok) {
      throw new Error("Failed to fetch quiz history");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

/**
 * Get detailed quiz data by ID
 * @param {number} quizId - Quiz ID
 * @returns {Promise<Object>} Complete quiz data
 */
export const getQuizById = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch quiz details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};
