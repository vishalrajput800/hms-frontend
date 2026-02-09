import React, { useState, useEffect } from "react";
import "../common.css";

function Doctors() {
  const [doctors, setDoctors] = useState(() => {
    return JSON.parse(localStorage.getItem("doctors")) || [];
  });

  const [mode, setMode] = useState("add"); // add | details
  const [currentDoctor, setCurrentDoctor] = useState(null);

  const [form, setForm] = useState({
    name: "",
    gender: "",
    specialization: "",
    mobile: "",
  });

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addDoctor = () => {
    if (!form.name || !form.gender || !form.specialization || !form.mobile) {
      alert("Please fill all doctor details");
      return;
    }

    const newDoctor = {
      id: "DOC-" + (doctors.length + 1),
      ...form,
    };

    const updated = [...doctors, newDoctor];
    setDoctors(updated);
    setCurrentDoctor(newDoctor);
    setMode("details");

    setForm({
      name: "",
      gender: "",
      specialization: "",
      mobile: "",
    });
  };

  return (
    <div className="page">
      <h1>Doctor Management</h1>

      {/* ADD DOCTOR FORM */}
      {mode === "add" && (
        <div className="glass">
          <input
            name="name"
            placeholder="Doctor Name"
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
            name="specialization"
            placeholder="Specialization (e.g. Cardiologist)"
            value={form.specialization}
            onChange={handleChange}
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
          />

          <button className="primary-btn" onClick={addDoctor}>
            Save Doctor
          </button>
        </div>
      )}

      {/* DOCTOR DETAILS PAGE */}
      {mode === "details" && currentDoctor && (
        <div className="list">
          <h3>Doctor Details</h3>

          <p><b>Doctor ID:</b> {currentDoctor.id}</p>
          <p><b>Name:</b> {currentDoctor.name}</p>
          <p><b>Gender:</b> {currentDoctor.gender}</p>
          <p><b>Specialization:</b> {currentDoctor.specialization}</p>
          <p><b>Mobile:</b> {currentDoctor.mobile}</p>

          <div style={{ marginTop: "20px" }}>
            <a
              href={`tel:${currentDoctor.mobile}`}
              className="primary-btn"
              style={{ display: "inline-block", textAlign: "center" }}
            >
              📞 Call Doctor
            </a>
          </div>

          <button
            className="primary-btn"
            style={{ marginTop: "15px", background: "#6c757d" }}
            onClick={() => setMode("add")}
          >
            ➕ Add Another Doctor
          </button>
        </div>
      )}

      {/* DOCTORS LIST WITH SERIAL NUMBER */}
      {doctors.length > 0 && (
        <div className="list">
          <h3>All Doctors</h3>
          <ul>
            {doctors.map((d, index) => (
              <li key={d.id}>
                <b>{index + 1}.</b> {d.id} — {d.name} | {d.specialization} | 📞 {d.mobile}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Doctors;
