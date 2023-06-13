import React, { useState } from "react";
import axios from "axios";

export const useDelete = (deleteFunction, confirmPromptDelete, handleResponseDelete) => {
  const [showConfirmationDelete, setshowConfirmationDelete] = useState(false);
  const [loadingDelete, setloadingDelete] = useState(false);
  const [errorDelete, seterrorDelete] = useState(null);
  const [resultDelete, setresultDelete] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [isSuccessDelete, setisSuccessDelete] = useState(false);

  const deleteById = (id) => {
    if (confirmPromptDelete) {
      setIdToDelete(id);
      setshowConfirmationDelete(true);
    } else {
      deletefinally(id);
    }
  };

  const deletefinally = async (id) => {
    try {
      setloadingDelete(true);
      const response = await deleteFunction(id);
      if (response.status === 200) {
        handleResponseDelete(true, response.data);
      } else {
        seterrorDelete(true);
        handleResponseDelete(false, null);
      }
    } catch (errorDelete) {
      seterrorDelete(true);
      handleResponseDelete(false, null);
    } finally {
      setloadingDelete(false);
    }
  };

  const handleCancelDelete = () => {
    // setIdToDelete(null);
    setshowConfirmationDelete(false);
  };

  return {
    deleteById,
    deletefinally,
    showConfirmationDelete,
    handleCancelDelete,
    resultDelete,
    idToDelete,
    loadingDelete,
    errorDelete,
    isSuccessDelete,
    resultDelete,
  };
};
