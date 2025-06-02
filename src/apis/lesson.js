import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchLessonsByAssessmentId = async (assessmentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lessons/assessment/${assessmentId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching lessons: ' + error.message);
  }
};

export const fetchLessonById = async (id) => {
  const res = await axios.get(`${BASE_URL}/lessons/${id}`);
  return res.data;
};

export const createLesson = async (lessonData) => {
  const res = await axios.post(`${BASE_URL}/lessons`, lessonData);
  return res.data;
};

export const updateLesson = async (id, lessonData) => {
  const res = await axios.put(`${BASE_URL}/lessons/${id}`, lessonData);
  return res.data;
};

export const deleteLesson = async (id) => {
  const res = await axios.delete(`${BASE_URL}/lessons/${id}`);
  return res.data;
};
