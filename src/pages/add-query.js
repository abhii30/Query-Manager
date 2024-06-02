import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddQuery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuery = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    await axios.post("http://localhost:5000/api/queries/add", newQuery);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Query</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      ></textarea>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        required
      />
      <button type="submit">Add Query</button>
    </form>
  );
};

export default AddQuery;
