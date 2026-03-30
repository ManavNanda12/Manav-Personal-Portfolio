const experiences = [
  {
    color: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    icon: "🌐",
    name: "Evince Development",
    isCurrent: true,
    role: "Full-Stack Developer — Angular / .NET / DotNetNuke",
    period: "Jun 2025 — Present",
    desc: "Working on a large-scale B2B e-Commerce platform built on DotNetNuke (DNN) CMS, comprising 20+ DesktopModules each with Angular SPA clients and .NET Core Web API backends. The platform handles complex B2B workflows including on-account purchasing, product allocations, curbside pickup scheduling, and ERP integration.",
    highlights: [
      "Developing and maintaining 20+ independently deployable Angular + .NET DNN modules following the ServiceRouteMapper API pattern",
      "Working with NgRx (Redux pattern) for state management across Angular SPAs — actions, reducers, effects, and selectors",
      "Integrating with a proprietary ERP backend via REST proxy layer (RequestHandler pattern), managing complex B2B checkout flows with AR credit enforcement",
      "Implemented Cloudflare Turnstile CAPTCHA across checkout and registration modules",
      "Contributing to Global Payments credit card integration (pre-auth, capture, void) and curbside pickup timeslot scheduling system",
    ],
    tech: ["DotNetNuke", "Angular", ".NET Web API", "NgRx", "C#", "RxJS", "SCSS", "Cloudflare"],
  },
  {
    color: "linear-gradient(135deg,#06b6d4,#0284c7)",
    icon: "🏗️",
    name: "Shaligram Infotech",
    isCurrent: false,
    role: "Software Developer — Angular / .NET Core / AWS",
    period: "Jan 2023 — May 2025",
    desc: "Core developer responsible for designing and building scalable full-stack web applications. Led backend development and cloud deployments, collaborating with cross-functional teams on API integration and performance optimization.",
    highlights: [
      "Developed 9+ scalable web applications using Angular, .NET Core Web API, and SQL, improving system maintainability",
      "Optimised SQL database performance by 40% through strategic indexing and query optimization",
      "Improved API response time by 32% by implementing Redis caching and performance tuning",
      "Deployed and managed projects on AWS (EC2, S3, RDS), ensuring scalable cloud infrastructure",
      "Integrated RESTful APIs with frontend applications for seamless cross-team user experiences",
    ],
    tech: ["Angular", ".NET Core", "SQL Server", "Redis", "AWS", "Web API"],
  },
  {
    color: "linear-gradient(135deg,#f472b6,#db2777)",
    icon: "🎓",
    name: "The Sparks Foundation",
    isCurrent: false,
    role: "Software Developer Intern",
    period: "Jun 2022 — Jul 2022",
    desc: "Built a full-featured banking system during a one-month intensive internship, implementing core transaction features, optimising database queries, and designing an accessible UI.",
    highlights: [
      "Built a banking system (XAMPP, MySQL, HTML/CSS/JavaScript) implementing 7+ core features including secure transactions",
      "Optimised MySQL queries, reducing data retrieval time by 30% with efficient indexing and stored procedures",
      "Conducted 14+ Postman test cases, identifying and resolving bugs to ensure system stability",
      "Designed an intuitive Bootstrap UI enhancing usability for 100+ users",
    ],
    tech: ["HTML/CSS/JS", "MySQL", "XAMPP", "Bootstrap", "Postman"],
  },
];

function TechChip({ text }: { text: string }) {
  return (
    <span
      style={{
        fontSize: "0.65rem",
        padding: "0.3rem 0.7rem",
        background: "rgba(6,182,212,0.08)",
        border: "1px solid rgba(6,182,212,0.2)",
        borderRadius: "3px",
        color: "#06b6d4",
        letterSpacing: "0.05em",
      }}
    >
      {text}
    </span>
  );
}

export default function Experience() {
  return (
    <section
      id="companies"
      style={{ padding: "120px 0", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6%" }}>
        <div className="section-header reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
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
            // Experience
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Where I've{" "}
            <em style={{ fontStyle: "normal", color: "#06b6d4" }}>Worked</em>
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
            My professional journey — from internship to full-stack developer.
          </p>
        </div>

        <div style={{ position: "relative", maxWidth: "820px", margin: "0 auto" }}>
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "linear-gradient(to bottom, transparent, #7c3aed, transparent)",
            }}
          />

          {experiences.map((exp, i) => (
            <div
              key={exp.name}
              className="reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr",
                gap: "2rem",
                marginBottom: "3rem",
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: exp.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  position: "relative",
                  zIndex: 1,
                  flexShrink: 0,
                }}
              >
                {exp.icon}
              </div>

              <div
                className="company-content"
                style={{
                  padding: "1.8rem 2rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(124,58,237,0.3)";
                  el.style.transform = "translateX(4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.transform = "translateX(0)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "0.8rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {exp.name}
                      {exp.isCurrent && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            fontSize: "0.65rem",
                            color: "#4ade80",
                            letterSpacing: "0.08em",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "2px",
                            background: "rgba(74,222,128,0.08)",
                            border: "1px solid rgba(74,222,128,0.2)",
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#4ade80",
                              animation: "pulse-dot 1.5s infinite",
                            }}
                          />
                          Current
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#06b6d4",
                        letterSpacing: "0.05em",
                        marginTop: "0.2rem",
                      }}
                    >
                      {exp.role}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "#64748b",
                      letterSpacing: "0.08em",
                      padding: "0.3rem 0.8rem",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.period}
                  </div>
                </div>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.82rem",
                    lineHeight: 1.8,
                    marginBottom: "1rem",
                  }}
                >
                  {exp.desc}
                </p>

                <ul style={{ listStyle: "none", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      style={{
                        fontSize: "0.78rem",
                        color: "#64748b",
                        lineHeight: 1.7,
                        paddingLeft: "1.2rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#06b6d4",
                          fontSize: "0.7rem",
                        }}
                      >
                        ▸
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {exp.tech.map((t) => <TechChip key={t} text={t} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
