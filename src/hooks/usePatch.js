import axios from "axios";
import { useState } from "react";

// Custom hook for PATCH request
export function usePatch(url) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const patchData = async (id, data) => {
      try {
        setLoading(true);
        const response = await axios.patch(`${url}/${id}`, data);
        setLoading(false);
        return response.data;
      } catch (error) {
        setError(error);
        setLoading(false);
        throw error;
      }
    };
  
    return { patchData, loading, error };
  }