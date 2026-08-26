import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateContent = async (payload) => {
  const response = await API.post('/api/generate', payload);
  return response.data;
};

export const refineContent = async (generationId, action) => {
  const response = await API.post('/api/refine', {
    generation_id: generationId,
    action: action,
  });
  return response.data;
};

export const fetchHistory = async () => {
  try {
    const response = await API.get('/api/history?limit=20');
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    return { success: true, data: [] };
  }
};

export const fetchTemplates = async () => {
  const response = await API.get('/api/templates');
  return response.data;
};

export const toggleFavorite = async (generationId) => {
  const response = await API.put(`/api/history/${generationId}/favorite`);
  return response.data;
};

export const deleteHistoryItem = async (generationId) => {
  const response = await API.delete(`/api/history/${generationId}`);
  return response.data;
};

export const fetchMemory = async () => {
  const response = await API.get('/api/memory');
  return response.data;
};

export const saveMemory = async (key, value) => {
  const response = await API.post('/api/memory', {
    key: key,
    value: value,
    context_category: 'profile',
  });
  return response.data;
};

export const deleteMemoryItem = async (key) => {
  const response = await API.delete(`/api/memory/${key}`);
  return response.data;
};

export const clearAllMemory = async () => {
  const response = await API.delete('/api/memory');
  return response.data;
};

export default API;