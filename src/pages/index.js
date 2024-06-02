import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/queries")
      .then((response) => setQueries(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>All Queries</h1>
      <ul>
        {queries.map((query) => (
          <li key={query._id}>
            <h2>{query.title}</h2>
            <p>{query.description}</p>
            <p>Tags: {query.tags.join(", ")}</p>
            <p>Status: {query.status}</p>
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

export default Home;
