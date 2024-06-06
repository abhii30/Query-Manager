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
    alert("Query added successfully");
    router.push("/");
  };

  return (
    <div className=" flex w-1/2">
      <form onSubmit={handleSubmit} className="gap-2 p-2 w-full">
        <h1 className="text-2xl text-">Add Query</h1>
        <input
          className="w-full p-2 my-2 border border-gray-300 rounded"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <textarea
          className="w-full p-2 my-2 border border-gray-300 rounded "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          cols={30}
          required
        ></textarea>
        <input
          className="w-full p-2 my-2 border border-gray-300 rounded"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          required
        />
        <button
          className="w-full p-2 my-2 border bg-green-600 text-white rounded"
          type="submit"
        >
          Add Query
        </button>
      </form>
    </div>
  );
};

export default AddQuery;
