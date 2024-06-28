import React, { useState } from "react";
import { useRouter } from "next/router";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("loginTimestamp", Date.now().toString());
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

return (
  <div className="flex justify-center items-center h-screen bg-[#00000082]">
    <div className="flex flex-col gap-2 items-center shadow-2xl p-10 w-1/2 md:w-1/3 lg:py-10 rounded-lg bg-white">
      <h1 className="text-2xl font-extrabold ">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
        <input
          className=" h-10 px-2 outline-none focus:outline-none rounded"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className=" h-10 px-2 outline-none focus:outline-none rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="bg-black h-10 text-white rounded">
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  </div>
);

};

export default AdminLogin;
