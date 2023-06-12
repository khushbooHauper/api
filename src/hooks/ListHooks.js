import { useState } from "react";
import axios from "axios";

const usePost = (url) => {
  const [loading, setLoading] = useState(false);

  const post = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(url, data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw new Error(error.message || "Error posting data");
    }
  };

  return { loading, post };
};

const useDelete = (url) => {
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    setDeleting(true);
    try {
      await axios.delete(url);
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
      throw new Error(error.message || "Error deleting data");
    }
  };

  return { deleting, remove };
};

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = () => {
    setState((prevState) => !prevState);
  };

  return [state, toggle];
};

export { usePost, useDelete, useToggle };
