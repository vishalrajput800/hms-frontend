import React, { useState, useEffect } from "react";
import "../common.css";
import "./Patients.css";

function Patients() {
  const [patients, setPatients] = useState(
    JSON.parse(localStorage.getItem("patients")) || []
  );

  const [form, setForm] = useState({
    name: "",
    gender: "",
    disease: "",
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPatient = () => {
    if (!form.name || !form.gender || !form.disease) return;

    setPatients([
      ...patients,
      {
        id: "PAT-" + (patients.length + 1),
        ...form,
      },
    ]);

    setForm({
      name: "",
      gender: "",
      disease: "",
    });
  };

  return (
    <div className="page">
      <h1>Patient Management</h1>

      <div className="glass patient-card">
        <div className="patient-grid">
          <input
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="disease"
            placeholder="Disease / Problem"
            value={form.disease}
            onChange={handleChange}
          />
        </div>

        <button className="primary-btn" onClick={addPatient}>
          Add Patient
        </button>
      </div>

      <div className="list">
        <h3>Registered Patients</h3>
        <ul>
          {patients.map((p) => (
            <li key={p.id}>
              <b>{p.id}</b> — {p.name} ({p.gender}) | {p.disease}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Patients;
