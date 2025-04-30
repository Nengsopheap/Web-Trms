// api/question.js
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function getAllquestion() {
  const response = await axios.get(`${BASE_URL}/questions`);
  console.log("API response:", response);
  return response.data;
}
// export async function getAllquestion() {
//   const res = await fetch("http://localhost:3000/questions");
//   if (!res.ok) throw new Error("Failed to fetch questions");
//   const data = await res.json();
//   return data;
// }

export const getassessmentid = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export async function createQuestion(questionData) {
  const response = await axios.post(`${BASE_URL}/questions`, questionData);
  return response.data;
}

export const submitAnswer = async (data) => {
  return await axios.post('http://localhost:3000/questions/submit-answer', data);
   // ✅ FULL URL
};

