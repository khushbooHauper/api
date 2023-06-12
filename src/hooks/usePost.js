import axios from "axios";
import { useState } from "react";


// Custom hook for POST request
export function usePost(url) {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null)
    const postData = async (data) => {
      try {
        setLoading(true);
        const response = await axios.post(url, data);
        setResult(response.data)
        setStatus(response.status)
        setLoading(false);
        return response.data;
      } catch (error) {
        setError(error);
        setLoading(false);
        throw error;
      }
    };
  
    return { result, postData, loading, error ,setLoading,status};
  }