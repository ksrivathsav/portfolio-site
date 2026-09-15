import { useRef } from "react";
import {
  motion,
  useMotionValue, useSpring,
} from "framer-motion";
import { Link } from "react-scroll";
import { Mail, ChevronDown, Briefcase, Building2, FolderGit2, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { personalInfo } from "../data/portfolioData";
import { useBreakpoint }  from "../hooks/useBreakpoint";
import { useTypewriter }  from "../hooks/useTypewriter";
import { useScramble }    from "../hooks/useScramble";
import { useCounter }     from "../hooks/useCounter";

/* ── Aurora animated background ─────────────────────────── */
function AuroraBackground() {
  const orbs = [
    {
      color: "rgba(99,102,241,0.22)",
      style: { top: "5%", left: "55%", width: "620px", height: "620px" },
      animation: "aurora-1 20s ease-in-out infinite",
    },
    {
      color: "rgba(168,85,247,0.18)",
      style: { top: "55%", left: "-8%", width: "520px", height: "520px" },
      animation: "aurora-2 25s ease-in-out infinite",
    },
    {
      color: "rgba(6,182,212,0.13)",
      style: { top: "-15%", left: "18%", width: "420px", height: "420px" },
      animation: "aurora-3 18s ease-in-out infinite",
    },
    {
      color: "rgba(236,72,153,0.10)",
      style: { top: "40%", left: "42%", width: "340px", height: "340px" },
      animation: "aurora-4 28s ease-in-out infinite",
    },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="aurora-orb"
          style={{
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            animation: orb.animation,
            ...orb.style,
          }}
        />
      ))}
    </div>
  );
}

/* ── Avatar with spinning rainbow ring ───────────────────── */
function AvatarOrb({ name, size = 220 }) {
  const px = `${size}px`;
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", width: px, height: px, flexShrink: 0 }}
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.07, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: "-22px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="avatar-ring"
        style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f59e0b, #10b981, #06b6d4, #6366f1)",
          zIndex: 1,
        }}
      />
      <div style={{ position: "absolute", inset: "4px", borderRadius: "50%", background: "var(--color-bg)", zIndex: 2 }} />
      <div style={{ position: "absolute", inset: "9px", borderRadius: "50%", overflow: "hidden", zIndex: 3 }}>
        <img
          src={`${import.meta.env.BASE_URL}avatar.jpg`}
          alt={`${name} — profile photo`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
      </div>
    </motion.div>
  );
}

/* ── Magnetic wrapper (desktop only) ─────────────────────── */
function MagneticButton({ children, disabled, strength = 0.28 }) {
  const ref = useRef(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const sx  = useSpring(x, { stiffness: 200, damping: 18 });
  const sy  = useSpring(y, { stiffness: 200, damping: 18 });
  if (disabled) return children;
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width  / 2)) * strength);
        y.set((e.clientY - (r.top  + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

const HERO_ROLES = [
  personalInfo.title,
  "Full-Stack Developer",
  "Cloud & DevOps Engineer",
  "ML / AI Engineer",
];

export default function Hero() {
  const { isMobile, isTablet, isSmallPhone, isPhoneLandscape, isLargeScreen } = useBreakpoint();

  const scrambledName = useScramble(personalInfo.name, { delay: 0.15, speed: 42 });
  const { displayed: typedTitle, showCursor } = useTypewriter(HERO_ROLES);

  const years     = useCounter(3);
  const companies = useCounter(3);
  const projects  = useCounter(10);

  const avatarSize = isSmallPhone ? 130 : isMobile ? 160 : isTablet ? 200 : 248;

  const statItems = [
    { ref: years.ref,     count: years.count,     suffix: "+", label: "Years Exp",  Icon: Briefcase  },
    { ref: companies.ref, count: companies.count, suffix: "",  label: "Companies",  Icon: Building2  },
    { ref: projects.ref,  count: projects.count,  suffix: "+", label: "Projects",   Icon: FolderGit2 },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: isPhoneLandscape ? "auto" : "min(100dvh, 100vh)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: isPhoneLandscape
          ? "5rem 1.5rem 3rem"
          : isMobile
          ? `calc(6rem + env(safe-area-inset-top, 0px)) 1.25rem calc(5rem + env(safe-area-inset-bottom, 0px))`
          : isTablet
          ? "8rem 2rem 5rem"
          : "0 3rem",
      }}
    >
      <AuroraBackground />

      {/* ── Main row ── */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? "2.5rem" : isTablet ? "3rem" : "6rem",
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* ── Avatar: top on mobile ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <AvatarOrb name={personalInfo.name} size={avatarSize} />
          </motion.div>
        )}

        {/* ── Text column ── */}
        <div
          style={{
            flex: "1 1 55%",
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <motion.span
              whileHover={{ scale: 1.04 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.35rem 1.1rem", borderRadius: "9999px",
                fontSize: "0.78rem", fontWeight: 500,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                backdropFilter: "blur(12px)",
                letterSpacing: "0.04em",
              }}
            >
              <span
                className="status-dot"
                style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", flexShrink: 0 }}
              />
              Open to new opportunities
            </motion.span>
          </motion.div>

          {/* Scramble name */}
          <motion.h1
            className="gradient-name"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: isSmallPhone
                ? "clamp(2rem, 10vw, 2.8rem)"
                : isMobile
                ? "clamp(2.4rem, 11vw, 3.2rem)"
                : isTablet
                ? "clamp(3rem, 7vw, 4.2rem)"
                : isLargeScreen
                ? "clamp(4.5rem, 5vw, 6.5rem)"
                : "clamp(3.8rem, 5.5vw, 5.8rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginBottom: "1rem",
              display: "block",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {scrambledName}
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            style={{
              marginBottom: "1.5rem",
              minHeight: isMobile ? "1.8rem" : "2.2rem",
              display: "flex", alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "1.05rem" : isTablet ? "1.25rem" : "1.45rem",
                fontWeight: 400,
                color: "var(--color-muted)",
                letterSpacing: "-0.01em",
              }}
            >
              {typedTitle}
              {showCursor && <span className="typing-cursor" />}
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.46, duration: 0.6 }}
            style={{
              fontSize: isMobile ? "0.95rem" : "1.05rem",
              color: "var(--color-muted)",
              maxWidth: isMobile ? "100%" : "480px",
              lineHeight: 1.78,
              marginBottom: "2rem",
            }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.6 }}
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-start",
              marginBottom: "2rem",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <Link to="projects" smooth duration={600} offset={-64} style={isMobile ? { width: "100%" } : {}}>
              <MagneticButton disabled={isMobile}>
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 36px -6px rgba(99,102,241,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  style={isMobile ? { width: "100%", justifyContent: "center" } : {}}
                >
                  View My Work <ArrowRight size={15} />
                </motion.button>
              </MagneticButton>
            </Link>
            <MagneticButton disabled={isMobile}>
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={isMobile ? { width: "100%", justifyContent: "center", display: "inline-flex" } : {}}
              >
                <GithubIcon size={15} /> GitHub
              </motion.a>
            </MagneticButton>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.68, duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            <div style={{ display: "flex", gap: "1.1rem" }}>
              {[
                { href: personalInfo.linkedin,          Icon: LinkedinIcon, label: "LinkedIn" },
                { href: `mailto:${personalInfo.email}`, Icon: Mail,         label: "Email" },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.22, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: "var(--color-muted)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-muted)"; }}
                >
                  <Icon size={isMobile ? 20 : 22} />
                </motion.a>
              ))}
            </div>

            {/* Stat strip */}
            <motion.div
              className="stat-strip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.55 }}
            >
              {statItems.map(({ ref, count, suffix, label }) => (
                <div key={label} className="stat-strip-item" ref={ref}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.06rem" }}>
                    <span style={{
                      fontSize: isMobile ? "1.55rem" : "1.9rem",
                      fontWeight: 800,
                      color: "var(--color-text)",
                      lineHeight: 1,
                      letterSpacing: "-0.05em",
                      fontVariantNumeric: "tabular-nums",
                    }}>
                      {count}
                    </span>
                    <span style={{ fontSize: isMobile ? "1rem" : "1.2rem", fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.04em" }}>
                      {suffix}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "0.65rem",
                    color: "var(--color-muted)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Avatar: right on tablet/desktop ── */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: "0 0 auto" }}
          >
            <AvatarOrb name={personalInfo.name} size={avatarSize} />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
