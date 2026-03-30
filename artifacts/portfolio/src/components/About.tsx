const skills = [
  {
    icon: "🔷",
    name: "Frontend",
    tags: ["Angular", "React.js", "NgRx", "TypeScript", "RxJS", "SCSS"],
  },
  {
    icon: "⚙️",
    name: "Backend",
    tags: [".NET Core", "Web API", "C#", "Python", "OWIN", "Hangfire"],
  },
  {
    icon: "🗄️",
    name: "Data & Cloud",
    tags: ["SQL Server", "MySQL", "Redis", "AWS EC2", "AWS S3", "AWS RDS"],
  },
  {
    icon: "🔌",
    name: "Integrations",
    tags: ["Stripe", "Firebase", "Cloudflare", "Google Auth", "Power BI", "Postman"],
  },
];

function Tag({ text }: { text: string }) {
  return (
    <span
      style={{
        fontSize: "0.6rem",
        padding: "0.2rem 0.5rem",
        background: "rgba(124,58,237,0.1)",
        border: "1px solid rgba(124,58,237,0.2)",
        borderRadius: "2px",
        color: "#a78bfa",
        letterSpacing: "0.05em",
      }}
    >
      {text}
    </span>
  );
}

function SkillCard({ icon, name, tags }: { icon: string; name: string; tags: string[] }) {
  return (
    <div
      className="skill-card"
      style={{
        padding: "1.2rem 1.5rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "6px",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
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
      <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>{icon}</div>
      <div style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.3rem" }}>{name}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.7rem" }}>
        {tags.map((t) => <Tag key={t} text={t} />)}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 0",
        background: "#0d0d1f",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div className="reveal">
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
              // About Me
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.3rem",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
              }}
            >
              Building{" "}
              <em style={{ fontStyle: "normal", color: "#f472b6" }}>scalable</em>{" "}
              systems that last
            </h2>
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                borderRadius: "2px",
                marginBottom: "1.5rem",
              }}
            />
            <div
              style={{
                color: "#64748b",
                fontSize: "0.85rem",
                lineHeight: 2,
              }}
            >
              <p>
                I'm a Full-Stack Developer with 2.4 years of hands-on experience designing and building scalable web applications. My core stack is Angular + .NET Core + SQL, but I'm equally comfortable working across the full cloud-to-client pipeline.
              </p>
              <p style={{ marginTop: "1rem" }}>
                I've shipped 9+ production applications, optimised SQL performance by 40%, cut API response times by 32% using Redis caching, and deployed on AWS with EC2, S3, and RDS. I take pride in writing clean, maintainable code and always look for opportunities to improve both performance and developer experience.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Currently based in Ahmedabad, India. B.Tech (IT) from Marwadi University with a 9.05 CGPA. AWS Certified. Always learning.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.8rem",
                marginTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "💼 LinkedIn", href: "https://linkedin.com/in/manav-nanda" },
                { label: "⚡ GitHub", href: "https://github.com" },
                { label: "✉️ Email", href: "mailto:nandamanav7@gmail.com" },
                { label: "📞 +91 878 016 0945", href: "tel:+918780160945" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "3px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: "0.72rem",
                    color: "#64748b",
                    textDecoration: "none",
                    transition: "all 0.25s",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = "#06b6d4";
                    el.style.color = "#06b6d4";
                    el.style.background = "rgba(6,182,212,0.05)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "#64748b";
                    el.style.background = "transparent";
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {skills.map((s) => <SkillCard key={s.name} {...s} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
