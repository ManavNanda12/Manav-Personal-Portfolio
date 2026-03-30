export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "2rem 6%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        color: "#64748b",
        fontSize: "0.72rem",
        letterSpacing: "0.08em",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div>© {new Date().getFullYear()} Manav Nanda. All rights reserved.</div>
      <nav style={{ display: "flex", gap: "2rem" }}>
        {[
          { href: "#hero", label: "Home" },
          { href: "#about", label: "About" },
          { href: "#companies", label: "Experience" },
          { href: "#projects", label: "Projects" },
          { href: "#contact", label: "Contact" },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              color: "#64748b",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#e2e8f0")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#64748b")}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div>Built with ❤️ &amp; ☕ in Ahmedabad</div>
    </footer>
  );
}
