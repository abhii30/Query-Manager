import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Home = () => {
  const [queries, setQueries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/queries")
      .then((response) => setQueries(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAdminClick = () => {
    router.push("/admin");
  };
  const handleAddQueryClick = () => {
    router.push("/add-query");
  };

  return (
    <div className="p-2 relative h-screen">
      <button onClick={handleAdminClick} className="p-2 rounded bg-green-200 justify-end flex">
        Admin?
      </button>
      <button
        className="p-2 rounded bg-blue-400 text-white absolute right-2 bottom-2"
        onClick={handleAddQueryClick}
      >
        + Add Query
      </button>
      <h1 className="text-2xl">All Queries</h1>
      <ul className="flex gap-2">
        {queries.map((query) => (
          <li
            key={query._id}
            className="flex border flex-col  px-4 py-2 w-full"
          >
            <h2 className="text-xl font-semibold uppercase">{query.title}</h2>
            <p className="normal-case">{query.description}</p>

            <p>Status: {query.status}</p>
            <p className="my-1">
              {query.tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className="bg-green-200 text-green-800 px-2 py-1 rounded mr-2"
                  >
                    {tag}
                  </span>
                );
              })}
            </p>
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
