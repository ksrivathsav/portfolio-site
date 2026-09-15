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
import { useCounter }     from "../hooks/useCounter";

function GlowOrb({ color, style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(72px)",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
}

function AvatarOrb({ name, size = 220 }) {
  const px = `${size}px`;
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", width: px, height: px, flexShrink: 0 }}
    >
      {/* Outer pulse glow */}
      <motion.div
        animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.08, 0.35] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: "-18px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)",
          zIndex: 0,
        }}
      />
      {/* Spinning conic ring */}
      <div
        className="avatar-ring"
        style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f59e0b, #10b981, #06b6d4, #6366f1)",
          zIndex: 1,
        }}
      />
      {/* Gap ring */}
      <div style={{ position: "absolute", inset: "4px", borderRadius: "50%", background: "var(--color-bg)", zIndex: 2 }} />
      {/* Photo */}
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

// Defined outside component so the array reference stays stable across renders
const HERO_ROLES = [
  personalInfo.title,
  "Full-Stack Developer",
  "Cloud & DevOps Engineer",
  "ML / AI Engineer",
];

export default function Hero() {
  const { isMobile, isTablet, isSmallPhone, isPhoneLandscape, isLargeScreen } = useBreakpoint();

  const { displayed: typedTitle, showCursor } = useTypewriter(HERO_ROLES);

  const years     = useCounter(3);
  const companies = useCounter(3);
  const projects  = useCounter(10);

  const avatarSize = isSmallPhone ? 130 : isMobile ? 160 : isTablet ? 190 : 240;

  return (
    <section
      id="hero"
      style={{
        /*
         * 100dvh — Dynamic Viewport Height
         * On iOS Safari, 100vh includes the browser chrome (address bar),
         * causing content to be hidden. 100dvh adjusts dynamically.
         * Falls back to 100vh for browsers that don't support dvh.
         */
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
      {/* ── Background glows ── */}
      <GlowOrb color="rgba(99,102,241,0.15)"  style={{ top: "10%",  right: "0%",   width: "700px", height: "700px" }} />
      <GlowOrb color="rgba(168,85,247,0.10)"  style={{ bottom: "5%", left: "-5%",  width: "550px", height: "550px" }} />
      <GlowOrb color="rgba(6,182,212,0.07)"   style={{ top: "50%",  left: "38%",   width: "320px", height: "320px" }} />

      {/* ── Main row ── */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? "2.5rem" : isTablet ? "3rem" : "7rem",
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* ── Avatar: top on mobile, right on desktop ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <AvatarOrb name={personalInfo.name} size={avatarSize} />
          </motion.div>
        )}

        {/* ── Left / text column ── */}
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
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <motion.span
              whileHover={{ scale: 1.04 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.35rem 1.1rem", borderRadius: "9999px",
                fontSize: "0.8rem", fontWeight: 500,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                className="status-dot"
                style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", flexShrink: 0 }}
              />
              Open to new opportunities
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="gradient-name"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
            }}
          >
            {personalInfo.name}
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.6 }}
            style={{
              marginBottom: "1.5rem",
              minHeight: isMobile ? "1.8rem" : "2.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "1.05rem" : isTablet ? "1.25rem" : "1.5rem",
                fontWeight: 400,
                color: "var(--color-muted)",
                letterSpacing: "-0.02em",
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
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: isMobile ? "0.95rem" : "1.05rem",
              color: "var(--color-muted)",
              maxWidth: isMobile ? "100%" : "480px",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
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
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 32px -6px rgba(99,102,241,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  style={isMobile ? { width: "100%", justifyContent: "center" } : {}}
                >
                  View My Work <ArrowRight size={15} />
                </motion.button>
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Social links + stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.72, duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            {/* Socials */}
            <div style={{ display: "flex", gap: "1.25rem" }}>
              {[
                { href: personalInfo.github,            Icon: GithubIcon,   label: "GitHub" },
                { href: personalInfo.linkedin,          Icon: LinkedinIcon, label: "LinkedIn" },
                { href: `mailto:${personalInfo.email}`, Icon: Mail,         label: "Email" },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: "var(--color-muted)", display: "flex", alignItems: "center", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-muted)"; }}
                >
                  <Icon size={isMobile ? 20 : 22} />
                </motion.a>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: isSmallPhone ? "1.25rem" : isMobile ? "1.75rem" : "2.75rem", flexWrap: "wrap" }}>
              {[
                { ref: years.ref,     count: years.count,     suffix: "+", label: "Years Exp",  Icon: Briefcase },
                { ref: companies.ref, count: companies.count, suffix: "",  label: "Companies",  Icon: Building2 },
                { ref: projects.ref,  count: projects.count,  suffix: "+", label: "Projects",   Icon: FolderGit2 },
              ].map(({ ref, count, suffix, label, Icon }) => (
                <div
                  key={label}
                  ref={ref}
                  style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start", gap: "0.15rem" }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.1rem" }}>
                    <span style={{
                      fontSize: isMobile ? "1.7rem" : "2.1rem",
                      fontWeight: 800,
                      color: "var(--color-text)",
                      lineHeight: 1,
                      letterSpacing: "-0.05em",
                      fontVariantNumeric: "tabular-nums",
                    }}>
                      {count}
                    </span>
                    <span style={{ fontSize: isMobile ? "1.1rem" : "1.3rem", fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.04em" }}>
                      {suffix}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "0.68rem",
                    color: "var(--color-muted)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right / avatar column (tablet + desktop) ── */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
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
