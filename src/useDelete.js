import React, { useState } from "react";
import axios from "axios";

export const useDelete = (deleteFunction, confirmPrompt, handleResponse) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteById = (id) => {
    if (confirmPrompt) {
      setIdToDelete(id);
      setShowConfirmation(true);
    } else {
      deletefinally(id);
    }
  };

  const deletefinally = async (id) => {
    try {
      setLoading(true);
      const response = await deleteFunction(id);
      if (response.status === 200) {
        handleResponse(true, response.data);
      } else {
        setError(true);
        handleResponse(false, null);
      }
    } catch (error) {
      setError(true);
      handleResponse(false, null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // setIdToDelete(null);
    setShowConfirmation(false);
  };

  return {
    showConfirmation,
    deleteById,
    deletefinally,
    showConfirmation,
    handleCancel,
    result,
    idToDelete,
    loading,
    error,
    isSuccess,
    result,
  };
};
