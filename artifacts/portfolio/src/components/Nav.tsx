import { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#companies", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.35 }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 6%",
        background: "rgba(8,8,18,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "1.3rem",
          background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
        }}
      >
        MN.DEV
      </div>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
        {links.map((l) => {
          const id = l.href.replace("#", "");
          const isActive = active === id;
          return (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  color: isActive ? "#e2e8f0" : "#64748b",
                  textDecoration: "none",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                  position: "relative",
                  display: "inline-block",
                  paddingBottom: "4px",
                }}
              >
                {l.label}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "#06b6d4",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 0.3s",
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
