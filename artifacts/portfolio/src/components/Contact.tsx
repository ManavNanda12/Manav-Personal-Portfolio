import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleSend = () => {
    const newErrors: Record<string, boolean> = {};
    (["name", "email", "subject", "message"] as const).forEach((k) => {
      if (!form[k].trim()) newErrors[k] = true;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
    }, 1200);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[field] ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.08)"}`,
    color: "#e2e8f0",
    padding: "0.85rem 1rem",
    borderRadius: "6px",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.82rem",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
    width: "100%",
    resize: "none" as const,
  });

  return (
    <section
      id="contact"
      style={{ padding: "120px 0", position: "relative", overflow: "hidden", zIndex: 1 }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6%", position: "relative" }}>
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
            // Get In Touch
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Let's{" "}
            <em style={{ fontStyle: "normal", color: "#06b6d4" }}>Connect</em>
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
            gridTemplateColumns: "1fr 1.2fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div className="reveal">
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "2.3rem",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              Drop me<br />a{" "}
              <em style={{ fontStyle: "normal", color: "#7c3aed" }}>message</em>
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.9, marginBottom: "2rem" }}>
              Open to new opportunities, freelance projects, and interesting collaborations. Whether you want to discuss a project or just say hi — I'd love to hear from you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "📞", text: "+91 878 016 0945", label: "Phone", href: "tel:+918780160945" },
                { icon: "✉️", text: "nandamanav7@gmail.com", label: "Email", href: "mailto:nandamanav7@gmail.com" },
                { icon: "📍", text: "Ahmedabad, Gujarat, India", label: "Location — Open to Remote", href: undefined },
                { icon: "💼", text: "LinkedIn Profile", label: "Connect professionally", href: "https://linkedin.com/in/manav-nanda" },
              ].map((item) => {
                const Inner = (
                  <>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "8px",
                        background: "rgba(124,58,237,0.1)",
                        border: "1px solid rgba(124,58,237,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "1rem",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", color: "#e2e8f0" }}>{item.text}</div>
                      <div style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.08em", marginTop: "0.15rem" }}>{item.label}</div>
                    </div>
                  </>
                );

                const baseStyle: React.CSSProperties = {
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.2rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.04)",
                  transition: "all 0.3s",
                  textDecoration: "none",
                  cursor: item.href ? "none" : "default",
                };

                return item.href ? (
                  <a
                    key={item.text}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    style={baseStyle}
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
                    {Inner}
                  </a>
                ) : (
                  <div key={item.text} style={baseStyle}>{Inner}</div>
                );
              })}
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle("name")}
                    onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = errors.name ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label style={{ fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle("email")}
                    onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = errors.email ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Subject</label>
                <input
                  type="text"
                  placeholder="What's it about?"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle("subject")}
                  onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.subject ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={{ fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Message</label>
                <textarea
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle("message"), minHeight: "120px" }}
                  onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = errors.message ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={sending}
                style={{
                  padding: "0.85rem 2rem",
                  background: "#7c3aed",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.82rem",
                  letterSpacing: "0.05em",
                  cursor: "none",
                  transition: "all 0.3s",
                  boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                  alignSelf: "flex-start",
                  opacity: sending ? 0.7 : 1,
                }}
                onMouseEnter={e => {
                  if (!sending) {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(124,58,237,0.6)";
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
                }}
              >
                {sending ? "Sending…" : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div
          className="toast-show"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 1000,
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            background: "#1a2a1a",
            border: "1px solid rgba(74,222,128,0.3)",
            color: "#4ade80",
            fontSize: "0.82rem",
            letterSpacing: "0.03em",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          }}
        >
          ✅ Message sent! I'll get back to you soon.
        </div>
      )}
    </section>
  );
}
