import React, { useState } from "react";
import { usePatch } from "../hooks/usePatch";
import { useGet } from "../hooks/useGet";

export default function PatchPost() {
  const { data: initialPostData, refetch } = useGet("https://jsonplaceholder.typicode.com/posts/1");
  const { patchData, loading, error } = usePatch("https://jsonplaceholder.typicode.com/posts");
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { title: updatedTitle };
    try {
      const updatedPostData = await patchData(initialPostData.id, data);
      console.log("Post updated successfully:", updatedPostData);
      refetch(); // Refetch the initial data after updating
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <>
      <h2>Update Post</h2>
      {initialPostData && (
        <div>
          <h3>Current Post</h3>
          <p>Post ID: {initialPostData.id}</p>
          <p>Title: {initialPostData.title}</p>
        </div>
      )}
      
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          placeholder="New Title"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Post"}
        </button>
        {error && <div>Error: {error.message}</div>}
      </form>
    </>
  );
}
