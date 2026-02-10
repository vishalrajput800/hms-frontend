import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";

import Auth from "./pages/Login/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admissions from "./pages/Admissions/Admissions";
import Billing from "./pages/Billing/Billing";
import PatientHistory from "./pages/PatientHistory/PatientHistory";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("currentUser"));
    if (saved) setUser(saved);
  }, []);

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} user={user} setUser={setUser} />

      <div style={{ flex: 1 }}>
        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "admissions" && <Admissions />}
        {page === "billing" && <Billing />}
        {page === "history" && <PatientHistory />}
      </div>
    </div>
  );
}

export default App;
  