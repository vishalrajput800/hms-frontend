import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({ setPage }) {
  const [stats, setStats] = useState({
    doctors: 0,
    admissions: 0,
    active: 0,
    revenue: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const admissions = JSON.parse(localStorage.getItem("admissions")) || [];

    const activePatients = admissions.filter(a => !a.dischargeDate);

    let revenue = 0;
    admissions.forEach(a => {
      if (a.billTotal) revenue += a.billTotal;
    });

    const lastFive = [...admissions].reverse().slice(0, 5);

    setStats({
      doctors: doctors.length,
      admissions: admissions.length,
      active: activePatients.length,
      revenue,
    });

    setRecent(lastFive);
  }, []);

  return (
    <div className="page">
      <h1>Hospital Dashboard</h1>

      {/* TOP STATS */}
      <div className="dashboard-cards">
        <div className="dash-card">
          <h2>{stats.doctors}</h2>
          <p>Total Doctors</p>
        </div>
        <div className="dash-card">
          <h2>{stats.admissions}</h2>
          <p>Total Admissions</p>
        </div>
        <div className="dash-card">
          <h2>{stats.active}</h2>
          <p>Currently Admitted</p>
        </div>
        <div className="dash-card">
          <h2>₹{stats.revenue}</h2>
          <p>Total Revenue</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="list">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button onClick={() => setPage("admissions")}>➕ New Admission</button>
          <button onClick={() => setPage("history")}>🔎 Patient History</button>
          <button onClick={() => setPage("billing")}>💳 Billing</button>
        </div>
      </div>

      {/* RECENT ADMISSIONS TABLE */}
      <div className="list">
        <h3>Recent Admissions</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Room</th>
              <th>Admit Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recent.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No admissions available
                </td>
              </tr>
            )}

            {recent.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.patientId}</td>
                <td>{r.patientName}</td>
                <td>{r.doctorName}</td>
                <td>{r.roomType} / {r.roomNo}</td>
                <td>{r.admitDate}</td>
                <td>
                  {r.dischargeDate ? (
                    <span className="status discharged">Discharged</span>
                  ) : (
                    <span className="status admitted">Admitted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
