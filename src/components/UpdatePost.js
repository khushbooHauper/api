import React, { useState, useEffect } from "react";
import { useGet } from "../hooks/useGet";
import { usePut } from "../hooks/usePut";


export default function UpdatePost() {
  const { data: initialPostData, refetch } = useGet("https://jsonplaceholder.typicode.com/posts/1");
  const { putData, loading, error } = usePut("https://jsonplaceholder.typicode.com/posts");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [postId, setPostId] = useState("");
  const [updatedPost, setUpdatedPost] = useState({postId:'',title:''});

  useEffect(() => {
    if (initialPostData) {
      setUpdatedTitle(initialPostData.title);
      setPostId(initialPostData.id);
    }
  }, [initialPostData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { title: updatedTitle };
    try {
      const updatedPostData = await putData(postId, data);
      setUpdatedPost(updatedPostData);
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
          value={updatedTitle || ''}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          placeholder="New Title"
        />
        <input
          type="text"
          value={postId || ''}
          onChange={(e) => setPostId(e.target.value)}
          placeholder="Post ID"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Post"}
        </button>
        {error && <div>Error: {error.message}</div>}
      </form>
      {updatedPost && (
        <div>
          <h3>Updated Post</h3>
          <p>Post ID: {updatedPost.id}</p>
          <p>Title: {updatedPost.title}</p>
        </div>
      )}
    </>
  );
}
