import React, { useState } from "react";
import "./Auth.css";

function Auth({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "staff",
  });
  const [error, setError] = useState("");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = () => {
    if (!form.name || !form.username || !form.password) {
      setError("All fields are required");
      return;
    }

    const exists = users.find(u => u.username === form.username);
    if (exists) {
      setError("Username already exists");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    setError("");
    setMode("login");
    alert("Account created. Please login.");
  };

  const login = () => {
    const user = users.find(
      u =>
        u.username === form.username &&
        u.password === form.password
    );

    if (!user) {
      setError("Invalid credentials");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: user.name,
        username: user.username,
        role: user.role,
      })
    );

    onLogin(user);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Hospital Management System</h2>
        <p>{mode === "login" ? "Login to continue" : "Create new account"}</p>

        {error && <div className="error">{error}</div>}

        {mode === "register" && (
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        )}

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {mode === "register" && (
          <select name="role" onChange={handleChange}>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button onClick={mode === "login" ? login : register}>
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        <div className="switch">
          {mode === "login" ? (
            <span onClick={() => setMode("register")}>
              Don’t have an account? <b>Create one</b>
            </span>
          ) : (
            <span onClick={() => setMode("login")}>
              Already have an account? <b>Login</b>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
