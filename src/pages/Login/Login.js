import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // SIMPLE DEMO CREDENTIALS
    if (
      (role === "admin" && username === "admin" && password === "admin123") ||
      (role === "staff" && username === "staff" && password === "staff123")
    ) {
      const user = { username, role };
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Hospital Management System Vishal</h2>
        <p>Login</p>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
