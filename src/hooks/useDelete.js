import axios from "axios";
import { useState } from "react";

// Custom hook for DELETE request
export function useDelete(url) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const deleteData = async (id) => {
      try {
        setLoading(true);
        const response = await axios.delete(`${url}/${id}`);
       
        return response.data;
      } catch (error) {
        setError(error);
       
        throw error;
      }finally{
        setLoading(false);
      }
    };
  
    return { deleteData, loading, error };
  }