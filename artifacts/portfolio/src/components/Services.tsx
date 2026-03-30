const services = [
  {
    num: "01",
    icon: "🔷",
    title: "Full-Stack Web Apps",
    desc: "End-to-end development with Angular frontend and .NET Core / Web API backend. Clean architecture, RESTful APIs, and responsive UIs that scale.",
  },
  {
    num: "02",
    icon: "🛒",
    title: "E-Commerce Platforms",
    desc: "B2B and B2C commerce systems with Stripe payment integration, subscription billing, product catalogues, admin dashboards, and automated email workflows.",
  },
  {
    num: "03",
    icon: "⚡",
    title: "Performance Optimisation",
    desc: "SQL indexing and query tuning (proven 40% gains), Redis caching for API performance (32% response time reduction), and AWS infrastructure right-sizing.",
  },
  {
    num: "04",
    icon: "☁️",
    title: "AWS Cloud Deployment",
    desc: "Deploying and managing applications on AWS — EC2 compute, S3 storage, RDS managed databases, Cloudflare CDN integration, and production monitoring.",
  },
  {
    num: "05",
    icon: "🔌",
    title: "Third-Party Integrations",
    desc: "Stripe, Firebase (Auth & Push), Google OAuth, Hangfire background jobs, Power BI embedding, payment gateway integration, and ERP API connectivity.",
  },
  {
    num: "06",
    icon: "🗄️",
    title: "Database Design & Tuning",
    desc: "Relational schema design, stored procedures, query optimisation, indexing strategies, and data migration — across SQL Server and MySQL.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{ padding: "120px 0", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6%" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
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
            // What I Offer
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            My{" "}
            <em style={{ fontStyle: "normal", color: "#06b6d4" }}>Services</em>
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
          <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.8 }}>
            What I bring to every engagement — from architecture to deployment.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {services.map((s, i) => (
            <div
              key={s.num}
              className="service-card reveal"
              style={{
                padding: "2.5rem 2rem",
                background: "#111128",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.35s",
                transitionDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = "rgba(124,58,237,0.25)";
                const bar = el.querySelector(".service-bar") as HTMLElement;
                if (bar) bar.style.transform = "scaleX(1)";
                const num = el.querySelector(".service-num") as HTMLElement;
                if (num) num.style.color = "rgba(124,58,237,0.25)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                const bar = el.querySelector(".service-bar") as HTMLElement;
                if (bar) bar.style.transform = "scaleX(0)";
                const num = el.querySelector(".service-num") as HTMLElement;
                if (num) num.style.color = "rgba(124,58,237,0.12)";
              }}
            >
              <div
                className="service-bar"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s",
                }}
              />
              <div
                className="service-num"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "3.5rem",
                  fontWeight: 800,
                  color: "rgba(124,58,237,0.12)",
                  lineHeight: 1,
                  marginBottom: "1rem",
                  transition: "color 0.3s",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                }}
              >
                {s.title}
              </div>
              <p style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.9 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
