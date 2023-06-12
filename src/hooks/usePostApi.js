import { useState } from 'react';
import axios from 'axios';

const usePostApi = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (newData) => {
    setLoading(true);
    try {
      const response = await axios.post(url, newData);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return [data, postData, loading, error];
};

export default usePostApi;
