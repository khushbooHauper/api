import { useState } from "react";

export const useEdit = (editFunction, confirmPrompt, handleResponse) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);

  const EditById = (id, data) => {
    if (confirmPrompt) {
      setIdToEdit(id);
      setUpdatedData(data);
      setShowConfirmation(true);
    } else {
      editFinally(id, data);
    }
  };

  const editFinally = async (id, data) => {
    try {
      setLoading(true);
      const response = await editFunction(id, data);
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
    setShowConfirmation(false);
  };

  return {
    showConfirmation,
    EditById,
    editFinally,
    showConfirmation,
    handleCancel,
    result,
    idToEdit,
    loading,
    error,
    isSuccess,
    updatedData,
  };
};
