"use client";

import { useState, useEffect } from "react";

interface CompanyProfileProps {
  params: { id: string };
}

interface EnrichedData {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  signals: string[];
  length: number;
  sources: string;
  timestamp: string;
}

export default function CompanyProfile({ params }: CompanyProfileProps) {
  const companyId = params.id;

  // State for enriched data
  const [data, setData] = useState<EnrichedData | null>(null);
  const [loading, setLoading] = useState(false);

  // State for notes (SSR safe)
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`note-${companyId}`);
    if (saved) setNote(saved);
  }, [companyId]);

  function saveNote() {
    localStorage.setItem(`note-${companyId}`, note);
    alert("Note saved 📝");
  }

  async function handleEnrich() {
    setLoading(true);
    try {
      const res = await fetch(`/api/enrich?id=${companyId}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const result: EnrichedData = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Error fetching enriched data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Company Profile</h1>
      <h2>ID: {companyId}</h2>

      <button onClick={handleEnrich} disabled={loading}>
        {loading ? "Enriching..." : "Enrich"}
      </button>

      {/* Notes Section */}
      <h3 style={{ marginTop: "30px" }}>Notes</h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: "400px", height: "100px" }}
      />
      <br />
      <button onClick={saveNote}>Save Note</button>

      {/* Enriched Data */}
      {data && (
        <div style={{ marginTop: "30px" }}>
          <h3>⬩ Summary</h3>
          <p>{data.summary}</p>

          <h3>⬩ What They Do?</h3>
          <p>{data.whatTheyDo.join(", ")}</p>

          <h3>⬩ Keywords</h3>
          <p>{data.keywords.join(", ")}</p>

          <h3>⬩ Signals</h3>
          <p>{data.signals.join(", ")}</p>

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