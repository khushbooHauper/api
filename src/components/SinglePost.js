import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SinglePost() {
  const [post, setPost] = useState();
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedBody, setUpdatedBody] = useState("");
  const [deleted, setDeleted] = useState(false);

  const getPost = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/2`
    );
    setPost(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleUpdate = async () => {
    if (updatedTitle && updatedBody) {
      const updatedPost = {
        ...post,
        title: updatedTitle,
        body: updatedBody,
      };

      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/2`,
        updatedPost
      );

      console.log(response.data);
      setPost(response.data);

      // Clear the input fields
      setUpdatedTitle("");
      setUpdatedBody("");
    }
  };

  const handleDelete = async () => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/2`);
    setDeleted(true);
  };

  return (
    <>
      {deleted ? (
        <h2>data has been deleted!</h2>
      ) : (
        <div className="post-div">
          <div className="border">
            <div className="d-flex">
              <div>
                <img
                  src="https://www.oberlo.com/media/1612639204-image3.jpg"
                  alt="post image"
                  className="post-image"
                />
              </div>
              <div>
                <h2>{post?.title}</h2>
                <p>{post?.body}</p>
              </div>
            </div>

            <div>
              Title:
              <input
                name="title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              Description:
              <input
                name="body"
                value={updatedBody}
                onChange={(e) => setUpdatedBody(e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
