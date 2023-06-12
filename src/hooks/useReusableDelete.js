import React, { useState } from "react";
import axios from "axios";

export const useDeleteConfirmation = (
  deleteFunction,
  confirmationPrompt,
  handleResponse
) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const deleteById = async (url, id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`${url}/${id}`);
      setResult(response)
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };


//   const xyz = () => {
//     const wwe = await deleteFunction(idtodelete)
    
//   };



  const handleCancel = () => {
    setShowConfirmation(false);
    setResult(null);
  };

  const handleClick = (id) => {
    setResult(id);
    setShowConfirmation(true);
  };

  return {
    deleteById,
    showConfirmation,
    handleClick,
    handleCancel,
    result,
  };
};
