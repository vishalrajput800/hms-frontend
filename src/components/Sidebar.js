import React from "react";
import "./Sidebar.css";

function Sidebar({ setPage, user, setUser }) {
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <div className="sidebar">
      {/* LOGO / BRAND */}
      <div className="sidebar-header">
        <h2>🏥 HMS</h2>
        <span>{user.role.toUpperCase()}</span>
      </div>

      {/* MENU */}
      <div className="sidebar-menu">
        <div onClick={() => setPage("dashboard")} className="menu-item">
          📊 <span>Dashboard</span>
        </div>

        <div onClick={() => setPage("admissions")} className="menu-item">
          📝 <span>Admissions</span>
        </div>

        <div onClick={() => setPage("history")} className="menu-item">
          📂 <span>Patient History</span>
        </div>

        <div onClick={() => setPage("billing")} className="menu-item">
          💳 <span>Billing</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <div className="user-info">
          👤 {user.name}
        </div>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
