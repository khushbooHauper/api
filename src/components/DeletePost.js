import React, { useState } from "react";
import { useDelete } from "../hooks/useDelete";
import { useGet } from "../hooks/useGet";

export default function DeletePost() {
  const { data } = useGet(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const { deleteData, loading, error } = useDelete(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [deletedItems, setDeletedItems] = useState([]);
  const handleDelete = async (title) => {
    try {
      await deleteData(title);
      console.log("Post deleted successfully",title);
      setDeletedItems((prevDeletedItems) => [...prevDeletedItems, title]);
    
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
// Filter the data by excluding the deleted items
const filteredData = data.filter((post) => !deletedItems.includes(post.title));
  return (
    <>
      <div>
        {filteredData &&
          filteredData.slice(0,5).map((d) => (
            <div key={d.title}>
              <p>{d.title}</p>
              <button onClick={() => handleDelete(d.title)}>Delete Post</button>
            </div>
          ))}
      </div>
      <div>
        <h2>deleted items</h2>
        {deletedItems && deletedItems.map((d) => <p key={d}>{d}</p>)}
      </div>
    </>
  );
}
