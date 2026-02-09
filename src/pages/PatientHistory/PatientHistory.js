import React, { useState } from "react";
import "../common.css";

function PatientHistory() {
  const [patientId, setPatientId] = useState("");
  const [record, setRecord] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const searchPatient = () => {
    const admissions = JSON.parse(localStorage.getItem("admissions")) || [];

    const key = patientId.trim().toUpperCase();

    const found = admissions.find(
      (a) => a.patientId && a.patientId.trim().toUpperCase() === key
    );

    if (found) {
      setRecord(found);
      setNotFound(false);
    } else {
      setRecord(null);
      setNotFound(true);
    }
  };

  return (
    <div className="page">
      <h1>Patient History</h1>

      {/* SEARCH BOX */}
      <div className="glass" style={{ maxWidth: "500px" }}>
        <input
          placeholder="Enter Patient ID (e.g. PAT-1)"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button className="primary-btn" onClick={searchPatient}>
          Search Patient
        </button>
      </div>

      {/* RESULT BOX */}
      {record && (
        <div className="list">
          <h3>Patient Details</h3>

          <table style={{ width: "100%", marginTop: "15px" }}>
            <tbody>
              <tr>
                <td><b>Patient ID</b></td>
                <td>{record.patientId}</td>
              </tr>
              <tr>
                <td><b>Patient Name</b></td>
                <td>{record.patientName}</td>
              </tr>
              <tr>
                <td><b>Disease / Problem</b></td>
                <td>{record.disease}</td>
              </tr>
              <tr>
                <td><b>Doctor Assigned</b></td>
                <td>
                  {record.doctorName} ({record.doctorId})
                </td>
              </tr>
              <tr>
                <td><b>Room Details</b></td>
                <td>
                  {record.roomType} | Room {record.roomNo} | Bed {record.bedNo}
                </td>
              </tr>
              <tr>
                <td><b>Admit Date</b></td>
                <td>{record.admitDate}</td>
              </tr>
              <tr>
                <td><b>Discharge Date</b></td>
                <td>{record.dischargeDate || "Currently Admitted"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* NOT FOUND */}
      {notFound && (
        <p style={{ textAlign: "center", marginTop: "25px" }}>
          ❌ No record found for Patient ID: <b>{patientId}</b>
        </p>
      )}
    </div>
  );
}

export default PatientHistory;
