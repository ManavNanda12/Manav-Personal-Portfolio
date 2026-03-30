import { useState } from "react";

const projects = [
  {
    type: "personal",
    featured: true,
    emoji: "🦎",
    bg: "linear-gradient(135deg,#0d1f1a 0%, #091420 50%, #160d1f 100%)",
    title: "Gecko Customer Portal",
    desc: "A full-featured B2C e-Commerce platform with subscription-based tiers, Stripe payment integration, Google OAuth, Firebase push notifications, and automated email workflows. Pro subscribers receive 20% off all products automatically.",
    highlights: [
      "Stripe Checkout + Subscription billing (Pro plan with 20% product discount logic)",
      "Google Login / Signup via Firebase Authentication",
      "Firebase Push Notifications for order updates and promotions",
      "Hangfire background jobs — welcome emails, contact us notifications, admin alerts, coupon processing",
      "Hosted on Cloudflare with custom domain, CDN, and DDoS protection",
      "Registered on Google Search Console and Google AdSense",
    ],
    stack: ["Angular", ".NET Core", "Web API", "Stripe", "Firebase", "Hangfire", "Cloudflare", "Google Auth"],
    links: [{ label: "Live Site", href: "#" }, { label: "GitHub", href: "#" }],
  },
  {
    type: "personal",
    featured: false,
    emoji: "📊",
    bg: "linear-gradient(135deg,#1a0d0d,#0d1220)",
    title: "Gecko Admin Portal",
    desc: "Companion admin dashboard for the Gecko platform — full product, order, and customer management with revenue analytics graphs, coupon engine, and automated contact-us request handling.",
    highlights: [
      "Revenue and order analytics with interactive charts",
      "Coupon creation, management, and usage tracking",
      "Automated admin notifications via Hangfire jobs",
      "Contact-us request inbox with reply workflows",
    ],
    stack: ["Angular", ".NET Core", "Hangfire", "SQL Server"],
    links: [{ label: "GitHub", href: "#" }],
  },
  {
    type: "company",
    featured: false,
    emoji: "🏪",
    bg: "linear-gradient(135deg,#0a1520,#141028)",
    title: "B2B e-Commerce Platform",
    privateNotice: true,
    desc: "A large-scale regulated B2B e-Commerce platform serving licensed business buyers. Built on DotNetNuke CMS with 20+ independently deployable Angular + .NET modules, integrated with a Microsoft Dynamics ERP backend.",
    highlights: [
      "20+ DNN DesktopModules (Angular SPAs + .NET Web API backends)",
      "Complex checkout: on-account AR purchasing, curbside pickup timeslots, gift card + credit card payments",
      "Product allocations engine enforcing per-licensee quantity limits",
      "Cloudflare Turnstile CAPTCHA, Power BI embedded reporting",
    ],
    stack: ["DotNetNuke", "Angular", "NgRx", ".NET Web API", "C#", "Global Payments"],
    links: [],
  },
  {
    type: "company",
    featured: false,
    emoji: "⚡",
    bg: "linear-gradient(135deg,#101a10,#0d1a20)",
    title: "Enterprise Web Applications (×9)",
    desc: "Designed and delivered 9+ scalable enterprise web applications at Shaligram Infotech using Angular, .NET Core Web API, and SQL Server — covering ERP dashboards, internal tools, and customer-facing portals.",
    highlights: [
      "40% SQL performance improvement through indexing & query optimization",
      "32% faster API responses via Redis caching layer",
      "Deployed on AWS EC2, S3, and RDS for scalable cloud hosting",
    ],
    stack: ["Angular", ".NET Core", "SQL Server", "Redis", "AWS"],
    links: [],
  },
  {
    type: "internship",
    featured: false,
    emoji: "🏦",
    bg: "linear-gradient(135deg,#1a1200,#0d1820)",
    title: "Banking System — Sparks Foundation",
    desc: "A fully functional banking web app built during a 1-month internship. Implemented 7+ core banking features including secure user auth, fund transfers, and transaction history.",
    highlights: [
      "7+ core banking features — transfers, deposits, withdrawals, history",
      "30% faster MySQL queries via indexing and stored procedures",
      "14+ Postman test cases; Bootstrap UI for 100+ users",
    ],
    stack: ["HTML/CSS/JS", "MySQL", "XAMPP", "Bootstrap"],
    links: [{ label: "GitHub", href: "#" }],
  },
];

const filters = ["All", "Personal", "Company", "Internship"];

const badgeStyles: Record<string, React.CSSProperties> = {
  personal: {
    background: "rgba(244,114,182,0.15)",
    border: "1px solid rgba(244,114,182,0.3)",
    color: "#f472b6",
  },
  company: {
    background: "rgba(6,182,212,0.12)",
    border: "1px solid rgba(6,182,212,0.3)",
    color: "#06b6d4",
  },
  internship: {
    background: "rgba(251,191,36,0.1)",
    border: "1px solid rgba(251,191,36,0.25)",
    color: "#fbbf24",
  },
};

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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visible = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.type === activeFilter.toLowerCase();
  });

  return (
    <section
      id="projects"
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
            // Recent Work
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Selected{" "}
            <em style={{ fontStyle: "normal", color: "#06b6d4" }}>Projects</em>
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
            Personal builds, company work, and internship projects — each solving a real problem.
          </p>
        </div>

        {/* Filter */}
        <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: "0.7rem", marginBottom: "3.5rem", flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "0.5rem 1.3rem",
                borderRadius: "3px",
                border: "1px solid",
                borderColor: activeFilter === f ? "#7c3aed" : "rgba(255,255,255,0.08)",
                background: activeFilter === f ? "rgba(124,58,237,0.1)" : "transparent",
                color: activeFilter === f ? "#e2e8f0" : "#64748b",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                cursor: "none",
                transition: "all 0.25s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {visible.map((p, i) => (
            <div
              key={p.title}
              className="project-card reveal"
              style={{
                background: "#111128",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                transitionDelay: `${i * 0.05}s`,
                ...(p.featured
                  ? { gridColumn: "1 / -1" }
                  : {}),
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-8px)";
                el.style.borderColor = "rgba(124,58,237,0.4)";
                el.style.boxShadow = "0 30px 80px rgba(0,0,0,0.4), 0 0 40px rgba(124,58,237,0.1)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.boxShadow = "none";
              }}
            >
              {p.featured ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div
                    style={{
                      height: "100%",
                      minHeight: "260px",
                      overflow: "hidden",
                      position: "relative",
                      background: p.bg,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "4rem",
                        opacity: 0.6,
                      }}
                    >
                      {p.emoji}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,18,0.9))",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "2px",
                        ...badgeStyles[p.type],
                      }}
                    >
                      {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
                    </div>
                  </div>
                  <div style={{ padding: "2.5rem" }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#f472b6", marginBottom: "0.4rem", display: "block" }}>
                      ⭐ Featured Project
                    </span>
                    <ProjectBody p={p} />
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      height: "180px",
                      overflow: "hidden",
                      position: "relative",
                      background: p.bg,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                        opacity: 0.5,
                      }}
                    >
                      {p.emoji}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,18,0.9))",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "2px",
                        ...badgeStyles[p.type],
                      }}
                    >
                      {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <ProjectBody p={p} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectBody({ p }: { p: typeof projects[0] }) {
  return (
    <>
      {"privateNotice" in p && p.privateNotice && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.65rem",
            color: "#64748b",
            padding: "0.3rem 0.7rem",
            borderRadius: "2px",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "1rem",
          }}
        >
          🔒 NDA — client name withheld
        </div>
      )}
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: p.featured ? "1.5rem" : "1.1rem",
          fontWeight: 700,
          marginBottom: "0.6rem",
        }}
      >
        {p.title}
      </div>
      <p style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.8, marginBottom: "1.2rem" }}>
        {p.desc}
      </p>
      <ul style={{ listStyle: "none", marginBottom: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {p.highlights.map((h) => (
          <li
            key={h}
            style={{
              fontSize: "0.75rem",
              color: "#64748b",
              paddingLeft: "1rem",
              position: "relative",
              lineHeight: 1.6,
            }}
          >
            <span style={{ position: "absolute", left: 0, color: "#06b6d4", fontSize: "0.65rem", top: "1px" }}>▸</span>
            {h}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
        {p.stack.map((s) => <Tag key={s} text={s} />)}
      </div>
      {p.links.length > 0 && (
        <div style={{ display: "flex", gap: "0.8rem" }}>
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: "0.72rem",
                color: "#64748b",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                transition: "color 0.2s",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#06b6d4")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#64748b")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {l.label === "GitHub" ? (
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                ) : (
                  <>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </>
                )}
              </svg>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
