import axios from "axios";
import { useState } from "react";

// Custom hook for PUT request
export function usePut(url) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const putData = async (id, data) => {
      try {
        setLoading(true);
        const response = await axios.put(`${url}/${id}`, data);
        setLoading(false);
        return response.data;
      } catch (error) {
        setError(error);
        setLoading(false);
        throw error;
      }
    };
  
    return { putData, loading, error };
  }