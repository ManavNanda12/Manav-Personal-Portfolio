const certs = [
  { icon: "☁️", name: "AWS Certified", issuer: "Amazon Web Services" },
  { icon: "🛒", name: "Flipkart GRID 4.0", issuer: "Flipkart" },
  { icon: "🗄️", name: "Oracle Database Programming", issuer: "Oracle" },
  { icon: "🐍", name: "Python for Data Science", issuer: "Coursera / IBM" },
  { icon: "🌐", name: "CCNA — Data Communication Networks", issuer: "Coursera" },
  { icon: "🎓", name: "B.Tech Information Technology — 9.05 CGPA", issuer: "Marwadi University, 2020–2023" },
];

export default function Certifications() {
  return (
    <section
      id="certs"
      style={{
        padding: "80px 0",
        background: "#0d0d1f",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6%" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#06b6d4",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            // Credentials
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Certs &{" "}
            <em style={{ fontStyle: "normal", color: "#06b6d4" }}>Education</em>
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
              borderRadius: "2px",
              margin: "1.5rem auto",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {certs.map((c, i) => (
            <div
              key={c.name}
              className="cert-card reveal"
              style={{
                padding: "1.4rem 1.2rem",
                background: "#111128",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                transition: "all 0.3s",
                textAlign: "center",
                transitionDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = "rgba(124,58,237,0.3)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.7rem" }}>{c.icon}</div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.3rem", lineHeight: 1.4 }}>
                {c.name}
              </div>
              <div style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.05em" }}>
                {c.issuer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
