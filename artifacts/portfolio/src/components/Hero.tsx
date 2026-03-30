import { useTyping } from "../hooks/useTyping";

export default function Hero() {
  const typedText = useTyping();

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "0 6%",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 80% at 80% 50%, rgba(124,58,237,0.15) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(6,182,212,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#06b6d4",
            border: "1px solid rgba(6,182,212,0.3)",
            padding: "0.4rem 0.9rem",
            borderRadius: "2px",
            marginBottom: "1.8rem",
            animation: "fadeUp 0.6s ease both",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#06b6d4",
              animation: "pulse-dot 1.5s infinite",
            }}
          />
          Open to new opportunities
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            animation: "fadeUp 0.7s 0.1s ease both",
          }}
        >
          Hi, I'm Manav
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 50%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              minHeight: "1.2em",
            }}
          >
            {typedText}
            <span className="typing-cursor" />
          </span>
        </h1>

        <p
          style={{
            marginTop: "1.5rem",
            color: "#64748b",
            fontSize: "0.88rem",
            lineHeight: 1.9,
            maxWidth: "480px",
            animation: "fadeUp 0.7s 0.2s ease both",
          }}
        >
          Full-Stack Developer with 2.4+ years of experience building scalable
          web applications with Angular, .NET Core, Web API, and SQL — with
          growing expertise in React.js, Python, and AWS cloud infrastructure.
        </p>

        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            animation: "fadeUp 0.7s 0.3s ease both",
          }}
        >
          <a
            href="#projects"
            style={{
              padding: "0.85rem 2rem",
              background: "#7c3aed",
              color: "#fff",
              borderRadius: "4px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.82rem",
              letterSpacing: "0.05em",
              textDecoration: "none",
              transition: "all 0.3s",
              boxShadow: "0 0 30px rgba(124,58,237,0.4)",
              display: "inline-block",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(124,58,237,0.6)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
            }}
          >
            View My Work
          </a>
          <a
            href="mailto:nandamanav7@gmail.com"
            style={{
              padding: "0.85rem 2rem",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "4px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.82rem",
              letterSpacing: "0.05em",
              textDecoration: "none",
              transition: "all 0.3s",
              display: "inline-block",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#06b6d4";
              el.style.color = "#06b6d4";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.08)";
              el.style.color = "#e2e8f0";
              el.style.transform = "translateY(0)";
            }}
          >
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            gap: "2.5rem",
            animation: "fadeUp 0.7s 0.4s ease both",
          }}
        >
          {[
            { num: "2.4+", label: "Yrs Experience" },
            { num: "9+", label: "Apps Shipped" },
            { num: "9.05", label: "B.Tech CGPA" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "2rem",
                  background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#64748b",
                  letterSpacing: "0.08em",
                  marginTop: "0.2rem",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          animation: "fadeIn 1s 0.5s ease both",
        }}
      >
        <div
          style={{
            width: "min(380px, 45vw)",
            aspectRatio: "3/4",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(124,58,237,0.3)",
            boxShadow: "0 0 60px rgba(124,58,237,0.15)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(160deg, #1a1a3e 0%, #0d0d20 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "6rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MN
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Manav Nanda
            </div>
          </div>

          {/* Floating badge 1 */}
          <div
            style={{
              position: "absolute",
              bottom: "-16px",
              left: "-30px",
              background: "#111128",
              border: "1px solid rgba(74,222,128,0.3)",
              padding: "0.8rem 1.2rem",
              borderRadius: "6px",
              backdropFilter: "blur(10px)",
              fontSize: "0.75rem",
              color: "#4ade80",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            🟢 Currently Working
            <span
              style={{
                display: "block",
                color: "#64748b",
                fontSize: "0.65rem",
                marginTop: "0.2rem",
              }}
            >
              Full-Stack Developer
            </span>
          </div>

          {/* Floating badge 2 */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "-40px",
              background: "#111128",
              border: "1px solid rgba(124,58,237,0.3)",
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              fontSize: "0.68rem",
              color: "#06b6d4",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              animation: "float 3.5s 1s ease-in-out infinite",
            }}
          >
            ⭐ 9.05 CGPA
          </div>
        </div>
      </div>
    </section>
  );
}
