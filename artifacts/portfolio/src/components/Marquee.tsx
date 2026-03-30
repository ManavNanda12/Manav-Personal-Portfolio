const items = [
  "Angular", ".NET Core", "Web API", "SQL Server", "React.js", "DotNetNuke",
  "AWS (EC2/S3/RDS)", "Python", "Redis", "Stripe API", "Firebase", "NgRx",
  "Hangfire", "Cloudflare",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "#0d0d1f",
        padding: "1rem 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0 2.5rem",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#64748b",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              transition: "color 0.2s",
              cursor: "default",
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "#06b6d4")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "#64748b")}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#7c3aed",
                flexShrink: 0,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
