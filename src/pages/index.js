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
  const statusColor = {
    Unresolved: "bg-red-400",
    "In Progress": "bg-yellow-400",
    Resolved: "bg-green-400",
  };
  const formateDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  };

  return (
    <div className="p-4 relative h-screen bg-[#00000082]">
      <button
        onClick={handleAdminClick}
        className="px-4 py-2 rounded-xl bg-[#171717] justify-end flex absolute top-4 right-4 text-white"
      >
        Admin?
      </button>

      <div className="flex gap-4 items-center mb-3">
        <h1 className="text-2xl">All Queries</h1>
        <button
          className="px-4 py-2 rounded-xl bg-blue-400 text-white "
          onClick={handleAddQueryClick}
        >
          + Add Query
        </button>
      </div>

      <ul className="gap-4 grid sm:grid-cols-3 lg:grid-cols-4">
        {queries.map((query) => (
          <li
            key={query._id}
            className="flex shadow-xl rounded-xl flex-col px-4 py-2 w-full gap-1 bg-[#F5F5F5]"
          >
            <h2 className="text-xl font-semibold uppercase">{query.title}</h2>
            <p className="normal-case leading-5 mb-2">{query.description}</p>

            <p>
              Status:{" "}
              <span
                className={`${statusColor[query.status]} px-2 py-1 rounded-lg`}
              >
                {query.status}
              </span>
            </p>
            <p className="my-1 flex flex-wrap gap-1">
              {query.tags.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="bg-slate-400 text-black px-2 py-1 rounded text-xs lowercase flex align-middle"
                  >
                    {"#" + tag}
                  </div>
                );
              })}
            </p>
            <h3>Replies</h3>
            <ul>
              {query.replies.map((reply, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="capitalize">{reply.message}</span>{" "}
                  <span className="text-xs text-gray-500">
                    {formateDate(reply.date)}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
