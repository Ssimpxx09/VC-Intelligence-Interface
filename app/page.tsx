import Link from "next/link";
export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <div style={{
        width: "220px",
        background: "#111",
        color: "white",
        padding: "20px"
      }}>
        <h2>VC Intel</h2>
        <ul style={{ marginTop: "30px", lineHeight: "2" }}>
        <li><Link href="/companies">Companies</Link></li>
          <li><Link href="/lists">Lists</Link></li>
          <li><Link href="/saved">Saved</Link></li>
        </ul>
      </div>

      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Dashboard</h1>
        <p>Welcome to VC Intelligence Interface</p>
      </div>

    </div>
  );
}