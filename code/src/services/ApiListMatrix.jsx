import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getMatrices = async () => {
  try {
    const response = await axios.get(`${API_URL}/matrices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matrices:', error);
    throw error;
  }
};
export const getMatrixById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/matrices/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching matrix by id:', error);
      throw error;
    }
};
export const updateMatrix = async (id, updatedMatrix) => {
    try {
      const response = await axios.put(`${API_URL}/matrices/${id}`, updatedMatrix);
      return response.data;
    } catch (error) {
      console.error('Error updating matrix:', error);
      throw error;
    }
};