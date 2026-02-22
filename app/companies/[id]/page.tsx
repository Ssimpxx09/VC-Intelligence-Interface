"use client";
import { useState, use } from "react";

export default function CompanyProfile({ params }) {
  const resolvedParams = use(params);
  const companyId = resolvedParams.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📝 NOTES
  const [note, setNote] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem(`note-${companyId}`) || ""
      : ""
  );

  function saveNote() {
    localStorage.setItem(`note-${companyId}`, note);
    alert("Note saved 📝");
  }

  async function handleEnrich() {
    setLoading(true);
    const res = await fetch(`/api/enrich?id=${companyId}`);
    const result = await res.json();
    setData(result);
    setLoading(false);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Company Profile</h1>
      <h2>ID: {companyId}</h2>

      <button onClick={handleEnrich}>
        {loading ? "Enriching..." : "Enrich"}
      </button>

      {/* 📝 NOTES UI */}
      <h3 style={{ marginTop: "30px" }}>Notes</h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: "400px", height: "100px" }}
      />
      <br />
      <button onClick={saveNote}>Save Note</button>

      {data && (
  <div style={{ marginTop: "30px" }}>
    <h3>⬩ Summary</h3>
    <p>{data.summary}</p>

    <h3>⬩ What They Do?</h3>
    <p>{data.whatTheyDo}</p>

    <h3>⬩ Keywords</h3>
    <p>{data.keywords}</p>

    <h3>⬩ Signals</h3>
    <p>{data.signals}</p>

    <h3>⬩ Length</h3>
    <p>{data.length}</p>

    <h3>⬩ Sources</h3>
    <p>{data.sources}</p>

    <h3>⬩ Date</h3>
    <p>{data.timestamp}</p>
  </div>
)}
    </div>
  );
}