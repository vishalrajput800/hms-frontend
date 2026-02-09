import React, { useState, useEffect } from "react";
import "../common.css";
import "./Admissions.css";

function Admissions() {
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("admissions")) || []
  );
  const [savedRecord, setSavedRecord] = useState(null);

  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    disease: "",
    roomType: "Non-AC",
    roomNo: "",
    bedNo: "",
    admitDate: "",
  });

  useEffect(() => {
    localStorage.setItem("admissions", JSON.stringify(records));
  }, [records]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAdmission = () => {
    if (!form.patientId || !form.patientName || !form.doctorId || !form.roomNo) {
      alert("Fill required fields");
      return;
    }

    const newRecord = { ...form };
    setRecords([...records, newRecord]);
    setSavedRecord(newRecord);

    setForm({
      patientId: "",
      patientName: "",
      doctorId: "",
      doctorName: "",
      disease: "",
      roomType: "Non-AC",
      roomNo: "",
      bedNo: "",
      admitDate: "",
    });
  };

  return (
    <div className="page">
      <h1>Patient Admission</h1>

      {/* FORM */}
      {!savedRecord && (
        <div className="glass admission-card">
          <div className="grid">
            <input name="patientId" placeholder="Patient ID (PAT-1)" value={form.patientId} onChange={handleChange} />
            <input name="patientName" placeholder="Patient Name" value={form.patientName} onChange={handleChange} />

            <input name="doctorId" placeholder="Doctor ID (DOC-1)" value={form.doctorId} onChange={handleChange} />
            <input name="doctorName" placeholder="Doctor Name" value={form.doctorName} onChange={handleChange} />

            <input name="disease" placeholder="Disease / Problem" value={form.disease} onChange={handleChange} />

            <select name="roomType" value={form.roomType} onChange={handleChange}>
              <option>Non-AC</option>
              <option>AC</option>
              <option>ICU</option>
            </select>

            <input name="roomNo" placeholder="Room No" value={form.roomNo} onChange={handleChange} />
            <input name="bedNo" placeholder="Bed No" value={form.bedNo} onChange={handleChange} />
            <input type="date" name="admitDate" value={form.admitDate} onChange={handleChange} />
          </div>

          <button className="primary-btn" onClick={saveAdmission}>
            Save Admission
          </button>
        </div>
      )}

      {/* RECEIPT */}
      {savedRecord && (
        <div className="list receipt">
          <h3>Admission Receipt</h3>

          <table style={{ width: "100%" }}>
            <tbody>
              <tr><td><b>Patient ID</b></td><td>{savedRecord.patientId}</td></tr>
              <tr><td><b>Name</b></td><td>{savedRecord.patientName}</td></tr>
              <tr><td><b>Disease</b></td><td>{savedRecord.disease}</td></tr>
              <tr><td><b>Doctor</b></td><td>{savedRecord.doctorName} ({savedRecord.doctorId})</td></tr>
              <tr><td><b>Room</b></td><td>{savedRecord.roomType} | Room {savedRecord.roomNo} | Bed {savedRecord.bedNo}</td></tr>
              <tr><td><b>Admit Date</b></td><td>{savedRecord.admitDate}</td></tr>
            </tbody>
          </table>

          <button className="primary-btn" onClick={() => window.print()}>
            🖨 Print Admission Receipt
          </button>

          <button
            className="primary-btn"
            style={{ marginTop: "10px", background: "#6c757d" }}
            onClick={() => setSavedRecord(null)}
          >
            ➕ Add Another Admission
          </button>
        </div>
      )}
    </div>
  );
}

export default Admissions;
