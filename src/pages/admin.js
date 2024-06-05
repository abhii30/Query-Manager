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
        .get("http://localhost:5000/api/queries")
        .then((response) => setQueries(response.data))
        .catch((error) => console.error(error));
    }
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

  const deleteQuery = async (id) => {
    await axios.delete(`http://localhost:5000/api/queries/${id}`);
    setQueries(queries.filter((query) => query._id !== id));
  };

  return (
    <div className="p-4 bg-[#00000082] h-screen">
      <h1 className="text-2xl">Admin Dashboard</h1>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        {queries.map((query) => (
          <li key={query._id} className=" gap-1 rounded shadow-lg p-4 bg-white">
            <h2 className="text-2xl capitalize mb-2">{query.title}</h2>
            <p className="bg-slate-300 p-2 rounded-lg">{query.description}</p>
            <p className="capitalize">Tags: {query.tags.join(", ")}</p>
            <p className="capitalize">Status: {query.status}</p>

            <div className="flex flex-row gap-2">
              <button
                onClick={() => updateStatus(query._id, "Unresolved")}
                className="rounded bg-red-400 px-2 py-1 text-white"
              >
                Unresolved
              </button>
              <button
                onClick={() => updateStatus(query._id, "In Progress")}
                className="rounded bg-yellow-400 px-2 py-1 text-white"
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(query._id, "Resolved")}
                className="rounded bg-green-400 px-2 py-1 text-white"
              >
                Resolved
              </button>
            </div>

            <input
              className=""
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
