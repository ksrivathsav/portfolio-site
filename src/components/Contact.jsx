import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { SectionHeader }     from "./shared";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { useBreakpoint }     from "../hooks/useBreakpoint";
import { useToast }          from "../context/ToastContext";
import { personalInfo }      from "../data/portfolioData";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { isMobile }           = useBreakpoint();
  const toast                  = useToast();
  const [form,   setForm]      = useState(INITIAL_FORM);
  const [status, setStatus]    = useState("idle");   // idle | loading | success | error
  const [errMsg, setErrMsg]    = useState("");
  const formRef = useRef(null);
  const inView  = useInView(formRef, { once: true, margin: "-60px" });

  const API_BASE = import.meta.env.VITE_API_BASE ?? "";

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (status !== "idle") setStatus("idle");
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        // _honeypot is intentionally left empty by real users
        body: JSON.stringify({ ...form, _honeypot: "" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");

      setStatus("success");
      setForm(INITIAL_FORM);
      toast.success("Message sent! I'll get back to you within 24–48 hours. 🎉");
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message);
      toast.error(err.message.slice(0, 120));
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.625rem",
    background: "var(--color-accent)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      className="section-glass"
      style={{ padding: "6rem 1.5rem" }}
    >
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader
          eyebrow="Get In Touch"
          title="Contact Me"
          subtitle="Have a project in mind, an opportunity to share, or just want to say hi? I'd love to hear from you."
        />

        <div style={{
          display: "grid",
          /* Pure CSS responsive: single column < 640px, two column ≥ 640px */
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: isMobile ? "2.5rem" : "4rem",
          alignItems: "start",
        }}>

          {/* ── Left: Quick info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            ref={formRef}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text)" }}>
              Let&apos;s work together
            </h3>
            <p style={{ color: "var(--color-muted)", lineHeight: 1.75, marginBottom: "2rem", fontSize: "0.95rem" }}>
              I&apos;m currently open to full-time roles, contract work, and interesting collaborations.
              Fill out the form and I&apos;ll get back to you within 24–48 hours — or reach me directly below.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: <Mail size={17} />, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <LinkedinIcon size={17} />, label: "linkedin.com/in/srivathsav-kommineni", href: personalInfo.linkedin },
                { icon: <GithubIcon   size={17} />, label: "github.com/ksrivathsav", href: personalInfo.github },
              ].map(({ icon, label, href }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    color: "var(--color-muted)", textDecoration: "none",
                    fontSize: "0.875rem", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-muted)"; }}
                >
                  <span style={{
                    width: "36px", height: "36px", borderRadius: "0.5rem",
                    background: "var(--color-accent)", border: "1px solid var(--color-border)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {icon}
                  </span>
                  <span style={{ wordBreak: "break-all" }}>{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* ── Honeypot: hidden from real users, traps bots ── */}
            <input
              name="_honeypot"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              readOnly
            />

            {/* Row: name + email */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-muted)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
                  Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  maxLength={100}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "var(--color-border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-muted)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
                  Email <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "var(--color-border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-muted)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                maxLength={200}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "var(--color-border)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-muted)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
                Message <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, role, or just say hi…"
                required
                rows={5}
                maxLength={2000}
                style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }}
                onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "var(--color-border)"; e.target.style.boxShadow = "none"; }}
              />
              <div style={{ textAlign: "right", fontSize: "0.72rem", color: form.message.length > 1800 ? "#ef4444" : "var(--color-muted)", marginTop: "0.25rem" }}>
                {form.message.length} / 2000
              </div>
            </div>

            {/* In-form status (backup visual, toast is primary) */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.75rem 1rem", borderRadius: "0.625rem",
                    background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                    color: "#10b981", fontSize: "0.875rem",
                  }}
                >
                  <CheckCircle2 size={16} />
                  Message sent! I&apos;ll be in touch within 24–48 hours.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.75rem 1rem", borderRadius: "0.625rem",
                    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
                    color: "#ef4444", fontSize: "0.875rem",
                  }}
                >
                  <AlertCircle size={16} />
                  {errMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={status !== "loading" ? { scale: 1.02 } : {}}
              whileTap={status !== "loading"  ? { scale: 0.97 } : {}}
              className="btn btn-primary"
              style={{
                alignSelf:    isMobile ? "stretch" : "flex-start",
                justifyContent: "center",
                opacity:      status === "loading" ? 0.7 : 1,
                cursor:       status === "loading" ? "not-allowed" : "pointer",
                paddingLeft:  "2rem",
                paddingRight: "2rem",
                minHeight:    "48px",
              }}
            >
              {status === "loading" ? (
                <>
                  <span style={{ width: "15px", height: "15px", border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin-ring 0.7s linear infinite" }} />
                  Sending…
                </>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
