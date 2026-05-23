import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { Mail, ChevronDown, Briefcase, Building2, FolderGit2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { personalInfo } from "../data/portfolioData";

function useTypewriter(text, speed = 55, startDelay = 1600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let t, iv;
    t = setTimeout(() => {
      let i = 0;
      iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, speed, startDelay]);
  return { displayed, done };
}

function useCounter(end, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 40;
    const increment = end / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return { count, ref };
}

const letters = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};
const letter = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  show:   { opacity: 1, y: 0,  rotateX: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { displayed: typedTitle, done: typingDone } = useTypewriter(personalInfo.title);
  const years    = useCounter(5);
  const companies = useCounter(3);
  const projects  = useCounter(10);

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
      {/* Floating ambient orbs */}
      <FloatingOrb color="rgba(99,102,241,0.18)"  style={{ top: "5%",   right: "2%",  width: "560px", height: "560px" }} duration={11} delay={0} />
      <FloatingOrb color="rgba(6,182,212,0.13)"   style={{ bottom: "10%", left: "0%",  width: "420px", height: "420px" }} duration={14} delay={3} />
      <FloatingOrb color="rgba(16,185,129,0.10)"  style={{ top: "45%",  left: "38%", width: "300px", height: "300px" }} duration={17} delay={6} />
      <FloatingOrb color="rgba(245,158,11,0.08)"  style={{ top: "70%",  right: "15%", width: "240px", height: "240px" }} duration={20} delay={2} />

      <div style={{ maxWidth: "840px", margin: "0 auto", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div variants={container} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Avatar with animated ring */}
          <motion.div variants={item} style={{ marginBottom: "2.5rem" }}>
            <AvatarOrb name={personalInfo.name} />
          </motion.div>

          {/* Status badge */}
          <motion.div variants={item} style={{ marginBottom: "1.75rem" }}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.3rem 1rem", borderRadius: "9999px",
                fontSize: "0.8rem", fontWeight: 500,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)", cursor: "default",
              }}
            >
              <span className="status-dot" style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#10b981", display: "inline-block", flexShrink: 0,
              }} />
              Open to opportunities
            </motion.span>
          </motion.div>

          {/* Name — letter by letter */}
          <div style={{ marginBottom: "0.75rem", perspective: "600px" }}>
            <motion.h1
              variants={letters}
              initial="hidden"
              animate="show"
              style={{
                fontSize: "clamp(2.8rem, 9vw, 5rem)",
                fontWeight: 800, lineHeight: 1.05,
                color: "var(--color-text)", letterSpacing: "-0.045em",
                display: "inline-block",
              }}
            >
              {personalInfo.name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  style={{ display: "inline-block", transformOrigin: "bottom center" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Typewriter role */}
          <motion.div variants={item} style={{ marginBottom: "1.75rem", minHeight: "2.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h2 style={{
              fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 500,
              color: "var(--color-muted)", letterSpacing: "-0.02em",
            }}>
              {typedTitle}
              {!typingDone && <span className="typing-cursor" />}
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} style={{
            fontSize: "1.1rem", color: "var(--color-muted)", maxWidth: "580px",
            lineHeight: 1.7, marginBottom: "2.5rem",
          }}>
            {personalInfo.bio}
          </motion.p>

          {/* Stats bar */}
          <motion.div variants={item} style={{
            display: "flex", gap: "0", marginBottom: "2.75rem",
            border: "1px solid var(--color-border)", borderRadius: "0.75rem",
            overflow: "hidden", background: "var(--color-surface)",
          }}>
            {[
              { ref: years.ref,     count: years.count,     suffix: "+", label: "Years Exp",   Icon: Briefcase },
              { ref: companies.ref, count: companies.count, suffix: "",  label: "Companies",   Icon: Building2 },
              { ref: projects.ref,  count: projects.count,  suffix: "+", label: "Projects",    Icon: FolderGit2 },
            ].map(({ ref, count, suffix, label, Icon }, i) => (
              <div key={label} ref={ref} style={{
                flex: 1, padding: "1.25rem 1.5rem", textAlign: "center",
                borderRight: i < 2 ? "1px solid var(--color-border)" : "none",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
              }}>
                <Icon size={16} style={{ color: "var(--color-muted)", marginBottom: "0.25rem" }} />
                <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--color-text)", lineHeight: 1 }}>
                  {count}{suffix}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={item} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
            <Link to="projects" smooth duration={600} offset={-64}>
              <motion.button className="btn btn-primary" whileHover={{ scale: 1.05, boxShadow: "0 8px 24px -4px rgba(99,102,241,0.4)" }} whileTap={{ scale: 0.97 }}>
                View Projects
              </motion.button>
            </Link>
            <div style={{ position: "relative" }}>
              <motion.button className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setIsContactOpen(!isContactOpen)}>
                Contact Me
              </motion.button>
              <AnimatePresence>
                {isContactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.93 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.93 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute", top: "calc(100% + 0.5rem)", left: "50%", transform: "translateX(-50%)",
                      background: "var(--color-surface)", border: "1px solid var(--color-border)",
                      borderRadius: "0.5rem", padding: "0.5rem",
                      display: "flex", flexDirection: "column", gap: "0.25rem",
                      minWidth: "152px", boxShadow: "0 12px 28px -6px rgba(0,0,0,0.14)", zIndex: 50,
                    }}
                  >
                    {[
                      { href: `mailto:${personalInfo.email}`, Icon: Mail, label: "Email" },
                      { href: personalInfo.linkedin, Icon: LinkedinIcon, label: "LinkedIn", ext: true },
                    ].map(({ href, Icon, label, ext }) => (
                      <a key={label} href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem", borderRadius: "0.25rem", color: "var(--color-text)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "background 0.2s" }}
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
              { href: personalInfo.github,            Icon: GithubIcon,   label: "GitHub" },
              { href: personalInfo.linkedin,          Icon: LinkedinIcon, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`, Icon: Mail,         label: "Email" },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                whileHover={{ scale: 1.2, y: -6, color: "var(--color-primary)" }}
                whileTap={{ scale: 0.95 }}
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

function FloatingOrb({ color, style, duration, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -35, 12, 0], x: [0, 18, -12, 0], scale: [1, 1.06, 0.95, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(52px)", pointerEvents: "none", zIndex: 0,
        ...style,
      }}
    />
  );
}

function AvatarOrb({ name }) {
  return (
    <div style={{ position: "relative", width: "210px", height: "210px" }}>
      {/* Outer glow pulse */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: "-12px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)",
          zIndex: 0,
        }}
      />
      {/* Spinning conic ring */}
      <div className="avatar-ring" style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "conic-gradient(from 0deg, #6366f1, #06b6d4, #10b981, #f59e0b, #ec4899, #8b5cf6, #6366f1)",
        zIndex: 1,
      }} />
      {/* BG gap mask */}
      <div style={{ position: "absolute", inset: "4px", borderRadius: "50%", background: "var(--color-bg)", zIndex: 2 }} />
      {/* Photo */}
      <div style={{ position: "absolute", inset: "8px", borderRadius: "50%", overflow: "hidden", zIndex: 3 }}>
        <img
          src={`${import.meta.env.BASE_URL}avatar.jpg`}
          alt={`${name} — profile photo`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
      </div>
    </div>
  );
}
