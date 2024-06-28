import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Admin = () => {
  const [queries, setQueries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    if (!isAdmin || !loginTimestamp) {
      router.push("/admin-login");
      return;
    }

    const now = Date.now();
    const loginTime = parseInt(loginTimestamp, 10);

    if (now - loginTime > 4 * 60 * 60 * 1000) {
      // 4 hours in milliseconds
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("loginTimestamp");
      router.push("/admin-login");
    } else {
      axios
        .get("https://query-manager.onrender.com/api/queries")
        .then((response) => setQueries(response.data))
        .catch((error) => console.error(error));
    }
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`https://query-manager.onrender.com/api/queries/${id}`, {
      status,
    });
    setQueries(
      queries.map((query) => (query._id === id ? { ...query, status } : query))
    );
  };

  const addReply = async (id, message) => {
    const query = queries.find((query) => query._id === id);
    query.replies.push({ message });
    await axios.put(
      `https://query-manager.onrender.com/api/queries/${id}`,
      query
    );
    setQueries([...queries]);
  };

  const deleteQuery = async (id) => {
    await axios.delete(`https://query-manager.onrender.com/api/queries/${id}`);
    setQueries(queries.filter((query) => query._id !== id));
  };

  const deleteReply = async (queryId, replyId) => {
    const query = queries.find((query) => query._id === queryId);
    query.replies.splice(replyId, 1);
    await axios.put(
      `https://query-manager.onrender.com/api/queries/${queryId}`,
      query
    );
    setQueries([...queries]);
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className="p-4 bg-[#00000082] h-screen relative">
      <h1 className="text-2xl text-white">Admin Dashboard</h1>
      <button
        onClick={handleHomeClick}
        className="px-4 py-2 rounded-xl bg-zinc-800 justify-end flex absolute top-4 right-4 text-white"
      >
        All Queries
      </button>
      <ul className="grid sm:grid-cols-2 gap-4 mt-4 lg:grid-cols-3">
        {queries.map((query) => (
          <li
            key={query._id}
            className=" gap-1 rounded shadow-lg p-4 bg-white relative"
          >
            <h2 className="text-2xl capitalize mb-2">{query.title}</h2>
            <p className="bg-slate-300 p-2 rounded-lg">{query.description}</p>
            <p className="capitalize">Tags: {query.tags.join(", ")}</p>
            <p className="capitalize">Status: {query.status}</p>

            <div className="flex flex-row gap-2 flex-wrap">
              <button
                onClick={() => updateStatus(query._id, "Unresolved")}
                className="rounded bg-red-400 px-2 py-1 text-white leading-6"
              >
                Unresolved
              </button>
              <button
                onClick={() => updateStatus(query._id, "In Progress")}
                className="rounded bg-yellow-400 px-2 py-1 text-white leading-6"
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(query._id, "Resolved")}
                className="rounded bg-green-400 px-2 py-1 text-white leading-6"
              >
                Resolved
              </button>
            </div>

            <input
              className="w-full mt-2 h-10 p-2 border border-gray-300 rounded-lg focus:outline-none"
              type="text"
              placeholder="Add reply"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  addReply(query._id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <h3>Replies</h3>
            <ul className="flex flex-col-reverse">
              {query.replies.map((reply, index) => (
                <li key={index} className="flex gap-2 items-center ">
                  <span className="text-sm">{reply.message}</span>{" "}
                  <button
                    className=""
                    onClick={() => {
                      deleteReply(query._id, index);
                    }}
                  >
                    <img src="/cross-icon.png" alt="delete" className="h-4" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="absolute top-1 right-1 "
              onClick={() => {
                deleteQuery(query._id);
                alert("Query Deleted");
              }}
            >
              <img src="/delete-icon.png" alt="delete" className="h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
