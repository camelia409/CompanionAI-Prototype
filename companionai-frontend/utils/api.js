import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI Backend

export const fetchFastAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching FastAPI data:", error);
    return null;
  }
};

const FLASK_BASE_URL = "http://127.0.0.1:5000"; // Flask Backend

export const fetchFlaskAPI = async () => {
  try {
    const response = await axios.get(`${FLASK_BASE_URL}/flask-endpoint`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Flask data:", error);
    return null;
  }
};
