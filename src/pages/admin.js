import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/queries")
      .then((response) => setQueries(response.data))
      .catch((error) => console.error(error));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/queries/${id}`, { status });
    setQueries(
      queries.map((query) => (query._id === id ? { ...query, status } : query))
    );
  };

  const addReply = async (id, message) => {
    const query = queries.find((query) => query._id === id);
    query.replies.push({ message });
    await axios.put(`http://localhost:5000/api/queries/${id}`, query);
    setQueries([...queries]);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {queries.map((query) => (
          <li key={query._id}>
            <h2>{query.title}</h2>
            <p>{query.description}</p>
            <p>Tags: {query.tags.join(", ")}</p>
            <p>Status: {query.status}</p>
            <button onClick={() => updateStatus(query._id, "unsolved")}>
              Unsolved
            </button>
            <button onClick={() => updateStatus(query._id, "under progress")}>
              Under Progress
            </button>
            <button onClick={() => updateStatus(query._id, "solved")}>
              Solved
            </button>
            <input
              type="text"
              placeholder="Add reply"
              onKeyDown={(e) =>
                e.key === "Enter" && addReply(query._id, e.target.value)
              }
            />
            <h3>Replies</h3>
            <ul>
              {query.replies.map((reply, index) => (
                <li key={index}>{reply.message}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
