import axios from "axios";

const BASE_URL = "http://localhost:3000/assessments"; // Change port if your NestJS runs on another port


// apis/assessment.ts
export async function fetchAssessments() {
  const res = await fetch("http://localhost:3000/assessments");
  if (!res.ok) throw new Error("Failed to fetch assessments");
  const data = await res.json();
  return data;
}

// Fetch a single assessment by ID
export const fetchAssessmentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Create a new assessment
export const createAssessment = async (assessmentData) => {
  const response = await axios.post(`${BASE_URL}`, assessmentData);
  return response.data;
};

// Update an assessment
export const updateAssessment = async (id, assessmentData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, assessmentData);
  return response.data;
};

// Delete an assessment
export const deleteAssessment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

// Get score of an assessment
export const fetchAssessmentScore = async (assessment_id) => {
  const response = await axios.get(`${BASE_URL}/${assessment_id}/score`);
  return response.data;
};
