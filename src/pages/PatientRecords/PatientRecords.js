import React, { useEffect, useState } from "react";
import "../common.css";

function PatientRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("admissions")) || [];
    setRecords(data);
  }, []);

  const saveToStorage = (data) => {
    setRecords(data);
    localStorage.setItem("admissions", JSON.stringify(data));
  };

  const dischargePatient = (index) => {
    if (!window.confirm("Discharge this patient?")) return;

    const today = new Date().toISOString().split("T")[0];
    const updated = [...records];

    updated[index] = {
      ...updated[index],
      dischargeDate: today,
    };

    saveToStorage(updated);
  };

  const deleteRecord = (index) => {
    if (!window.confirm("Delete this record permanently?")) return;
    const updated = records.filter((_, i) => i !== index);
    saveToStorage(updated);
  };

  const filtered = records.filter(
    (r) =>
      r.patientId?.toLowerCase().includes(search.toLowerCase()) ||
      r.patientName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Patient Records</h1>

      {/* SEARCH */}
      <div className="glass" style={{ maxWidth: "500px" }}>
        <input
          placeholder="Search by Patient ID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="list">
        <h3>Admission Records</h3>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Room</th>
              <th>Admit Date</th>
              <th>Discharge Date</th>
              <th>Status / Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.patientName} ({r.patientId})</td>
                <td>{r.doctorName} ({r.doctorId})</td>
                <td>{r.roomType} | Room {r.roomNo} | Bed {r.bedNo}</td>
                <td>{r.admitDate}</td>
                <td>{r.dischargeDate || "-"}</td>
                <td>
                  {!r.dischargeDate ? (
                    <button onClick={() => dischargePatient(i)}>
                      🏥 Discharge
                    </button>
                  ) : (
                    "Discharged"
                  )}
                  {" "}
                  <button onClick={() => deleteRecord(i)}>🗑</button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientRecords;
