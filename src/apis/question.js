import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function getAllquestion() {
  const response = await axios.get(`${BASE_URL}/questions`);
  return response.data;
}

export const getassessmentid = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export async function createQuestion(questionData) {
  const response = await axios.post(`${BASE_URL}/questions`, questionData);
  return response.data;
}

export const updateQuestion = async (id, updatedData) => {
  return await axios.post(`${BASE_URL}/questions/${id}`, updatedData);
};

export async function deleteQuestion(id) {
  return await axios.delete(`${BASE_URL}/questions/${id}`);
};

// ✅ Submit batch answers
export async function submitAnswer(answersArray) {
  try {
    const response = await axios.post(`${BASE_URL}/questions/submit-answer`, answersArray);
    return response.data;
  } catch (error) {
    throw new Error("Error submitting batch answers: " + error.message);
  }


}

