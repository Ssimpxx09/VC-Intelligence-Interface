"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const companies = [
  { id: "1", name: "OpenAI", industry: "AI", location: "USA" },
  { id: "2", name: "Stripe", industry: "Fintech", location: "USA" },
  { id: "3", name: "Razorpay", industry: "Fintech", location: "India" },
  { id: "4", name: "NeuroFlow AI", industry: "HealthTech", location: "San Francisco" },
  { id: "5", name: "GreenVolt", industry: "Renewable Energy", location: "London" },
];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    localStorage.setItem("savedSearch", search);
  }, [search]);

  let filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || c.industry === filter)
  );

  if (sort === "name") {
    filtered = [...filtered].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const itemsPerPage = 3;
  const start = page * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  function saveToList(id: string) {
    const list = JSON.parse(localStorage.getItem("myList") ?? "[]") as string[];
    list.push(id);
    localStorage.setItem("myList", JSON.stringify(list));
    alert("Saved to list ⭐");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Companies</h1>

      <input
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "20px", padding: "8px", width: "300px" }}
      />

      <select
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="">All</option>
        <option value="Fintech">Fintech</option>
        <option value="AI">AI</option>
      </select>

      <button onClick={() => setSort("name")} style={{ marginLeft: "10px" }}>
        Sort by Name
      </button>

      <table style={{ marginTop: "30px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Location</th>
            <th>Save</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((c) => (
            <tr key={c.id}>
              <td>
                <Link href={`/companies/${c.id}`}>{c.name}</Link>
              </td>
              <td>{c.industry}</td>
              <td>{c.location}</td>
              <td>
                <button onClick={() => saveToList(c.id)}>⭐</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 PAGINATION BUTTONS */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
}