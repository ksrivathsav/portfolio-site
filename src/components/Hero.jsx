import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { Mail, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { personalInfo } from "../data/portfolioData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function useTypewriter(text, speed = 58, startDelay = 950) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    let interval;
    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { displayed: typedTitle, done: typingDone } = useTypewriter(personalInfo.title);

  return (
    <section
      id="hero"
      className="hero-grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "8rem 1.5rem 4rem",
        overflow: "hidden",
      }}
    >
      {/* Floating background orbs */}
      <FloatingOrb color="rgba(99,102,241,0.13)"  style={{ top: "12%",  right: "6%",  width: "480px", height: "480px" }} duration={10} delay={0} />
      <FloatingOrb color="rgba(6,182,212,0.10)"   style={{ bottom: "18%", left: "4%",  width: "340px", height: "340px" }} duration={13} delay={2} />
      <FloatingOrb color="rgba(16,185,129,0.07)"  style={{ top: "55%",  left: "42%", width: "260px", height: "260px" }} duration={16} delay={5} />

      <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div variants={container} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Profile photo with animated ring */}
          <motion.div variants={item} style={{ marginBottom: "2rem" }}>
            <AvatarOrb name={personalInfo.name} />
          </motion.div>

          {/* Status badge */}
          <motion.div variants={item} style={{ marginBottom: "1.5rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.25rem 0.875rem", borderRadius: "9999px",
              fontSize: "0.8rem", fontWeight: 500,
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}>
              <span className="status-dot" style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#10b981", display: "inline-block", flexShrink: 0,
              }} />
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} style={{
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 800, lineHeight: 1.1, marginBottom: "0.5rem",
            color: "var(--color-text)", letterSpacing: "-0.04em",
          }}>
            {personalInfo.name}
          </motion.h1>

          {/* Typewriter title */}
          <motion.div variants={item} style={{ marginBottom: "1.5rem", minHeight: "2.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 500, color: "var(--color-muted)", letterSpacing: "-0.02em" }}>
              {typedTitle}
              {!typingDone && <span className="typing-cursor" />}
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} style={{
            fontSize: "1.1rem", color: "var(--color-muted)", maxWidth: "600px",
            lineHeight: 1.65, marginBottom: "2.5rem",
          }}>
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
            <Link to="projects" smooth duration={600} offset={-64}>
              <motion.button className="btn btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                View Projects
              </motion.button>
            </Link>

            <div style={{ position: "relative" }}>
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsContactOpen(!isContactOpen)}
              >
                Contact Me
              </motion.button>

              <AnimatePresence>
                {isContactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute", top: "calc(100% + 0.5rem)", left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--color-surface)", border: "1px solid var(--color-border)",
                      borderRadius: "0.5rem", padding: "0.5rem",
                      display: "flex", flexDirection: "column", gap: "0.25rem",
                      minWidth: "150px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.12)", zIndex: 50,
                    }}
                  >
                    {[
                      { href: `mailto:${personalInfo.email}`, Icon: Mail, label: "Email" },
                      { href: personalInfo.linkedin, Icon: LinkedinIcon, label: "LinkedIn", external: true },
                    ].map(({ href, Icon, label, external }) => (
                      <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          padding: "0.5rem 0.75rem", borderRadius: "0.25rem",
                          color: "var(--color-text)", textDecoration: "none",
                          fontSize: "0.875rem", fontWeight: 500, transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-accent)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <Icon size={15} /> {label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            {[
              { href: personalInfo.github,               Icon: GithubIcon,   label: "GitHub" },
              { href: personalInfo.linkedin,             Icon: LinkedinIcon, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`,    Icon: Mail,         label: "Email" },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.18, y: -5 }}
                style={{ color: "var(--color-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}

/* ── Floating background orb ── */
function FloatingOrb({ color, style, duration, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -28, 12, 0], x: [0, 14, -10, 0], scale: [1, 1.04, 0.97, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(48px)", pointerEvents: "none", zIndex: 0,
        ...style,
      }}
    />
  );
}

/* ── Profile photo with spinning gradient ring ── */
function AvatarOrb({ name }) {
  return (
    <div style={{ position: "relative", width: "192px", height: "192px" }}>
      {/* Rotating conic gradient ring */}
      <div className="avatar-ring" style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "conic-gradient(from 0deg, #6366f1, #06b6d4, #10b981, #f59e0b, #ec4899, #6366f1)",
        zIndex: 0,
      }} />
      {/* BG mask to create ring gap */}
      <div style={{
        position: "absolute", inset: "3px", borderRadius: "50%",
        background: "var(--color-bg)", zIndex: 1,
      }} />
      {/* Photo */}
      <div style={{ position: "absolute", inset: "7px", borderRadius: "50%", overflow: "hidden", zIndex: 2 }}>
        <img
          src={`${import.meta.env.BASE_URL}avatar.jpg`}
          alt={`${name} — profile photo`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
      </div>
    </div>
  );
}
