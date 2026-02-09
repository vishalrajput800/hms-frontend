import React, { useEffect, useState } from "react";
import "../common.css";

function Billing() {
  const [bill, setBill] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("admissions");

    if (!raw) {
      setError("No admission found. Please admit a patient first.");
      return;
    }

    const admissions = JSON.parse(raw);

    if (!Array.isArray(admissions) || admissions.length === 0) {
      setError("No admission records available.");
      return;
    }

    // Last admitted patient
    const index = admissions.length - 1;
    const record = admissions[index];

    if (!record.patientId || !record.admitDate) {
      setError("Invalid admission record.");
      return;
    }

    // AUTO DISCHARGE DATE
    const today = new Date().toISOString().slice(0, 10);
    record.dischargeDate = record.dischargeDate || today;

    // CALCULATE DAYS
    const admitDate = new Date(record.admitDate);
    const dischargeDate = new Date(record.dischargeDate);
    const days = Math.max(
      1,
      Math.ceil((dischargeDate - admitDate) / (1000 * 60 * 60 * 24))
    );

    // ROOM RATES
    const roomRates = {
      "Non-AC": 500,
      "AC": 1000,
      "ICU": 2000,
    };

    const roomRate = roomRates[record.roomType] || 500;
    const doctorFee = 300;

    const billTotal = days * roomRate + doctorFee;

    // 🔥 SAVE BILL TOTAL FOR DASHBOARD
    record.billTotal = billTotal;
    admissions[index] = record;
    localStorage.setItem("admissions", JSON.stringify(admissions));

    setBill({
      patientId: record.patientId,
      patientName: record.patientName,
      doctorName: record.doctorName,
      roomType: record.roomType,
      admitDate: record.admitDate,
      dischargeDate: record.dischargeDate,
      days,
      roomRate,
      doctorFee,
      roomTotal: days * roomRate,
      grandTotal: billTotal,
    });
  }, []);

  const printInvoice = () => {
    const content = document.querySelector(".invoice");
    if (!content) return;

    const win = window.open("", "", "width=800,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Hospital Invoice</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td { border: 1px solid #000; padding: 8px; }
            h1 { text-align: center; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  if (error) {
    return (
      <div className="page">
        <h1>Billing</h1>
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="page">
        <h1>Billing</h1>
        <p style={{ textAlign: "center" }}>Loading bill...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Final Billing</h1>

      <div className="list invoice">
        <p><b>Patient:</b> {bill.patientName} ({bill.patientId})</p>
        <p><b>Doctor:</b> {bill.doctorName}</p>
        <p><b>Room:</b> {bill.roomType}</p>
        <p><b>Admit:</b> {bill.admitDate}</p>
        <p><b>Discharge:</b> {bill.dischargeDate}</p>

        <table>
          <tbody>
            <tr>
              <td>Room Charges</td>
              <td>₹{bill.roomRate} × {bill.days} days</td>
              <td>₹{bill.roomTotal}</td>
            </tr>
            <tr>
              <td>Doctor Fee</td>
              <td>-</td>
              <td>₹{bill.doctorFee}</td>
            </tr>
            <tr>
              <td colSpan="2"><b>Total</b></td>
              <td><b>₹{bill.grandTotal}</b></td>
            </tr>
          </tbody>
        </table>

        <button className="primary-btn" onClick={printInvoice}>
          🖨 Print / Save PDF
        </button>
      </div>
    </div>
  );
}

export default Billing;
