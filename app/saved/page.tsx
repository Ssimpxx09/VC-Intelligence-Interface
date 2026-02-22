"use client";

import { useEffect, useState } from "react";

export default function SavedPage() {
  const [saved, setSaved] = useState("");

  useEffect(() => {
    const search =
      localStorage.getItem("savedSearch") || "";
    setSaved(search);
  }, []);

  function runSearch() {
    localStorage.setItem("globalSearch", saved);
    window.location.href = "/companies";
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Saved Search 💾</h1>

      {saved ? (
        <>
          <p>{saved}</p>

          <button
            onClick={runSearch}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
            }}
          >
            Run This Search 🔍
          </button>
        </>
      ) : (
        <p>No saved search</p>
      )}
    </div>
  );
}