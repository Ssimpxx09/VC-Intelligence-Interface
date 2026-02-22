"use client";

import { useEffect, useState } from "react";

export default function ListsPage() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("myList") ?? "[]") || [];
    setList(saved);
  }, []);

  function removeFromList(id: string) {
    const updated = list.filter((item) => item !== id);
    localStorage.setItem("myList", JSON.stringify(updated));
    setList(updated);
  }

  function exportList() {
    const dataStr = JSON.stringify(list, null, 2);
    const blob = new Blob([dataStr], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saved_companies.json";
    a.click();
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Saved Companies ⭐</h1>

      {list.length === 0 ? (
        <p>No saved companies</p>
      ) : (
        <>
          <ul>
            {list.map((id) => (
              <li key={id}>
                Company ID: {id}
                <button
                  onClick={() => removeFromList(id)}
                  style={{ marginLeft: "10px" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={exportList}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
            }}
          >
            Export JSON 📤
          </button>
        </>
      )}
    </div>
  );
}