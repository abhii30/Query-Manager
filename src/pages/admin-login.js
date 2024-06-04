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
  <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center shadow-2xl p-8 w-1/2 md:w-1/3 lg:p-20 rounded-lg">
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  </div>
);

};

export default AdminLogin;
