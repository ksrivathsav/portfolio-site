// ─────────────────────────────────────────────────────────
//  Hero.jsx
//  Minimalist centered landing section
// ─────────────────────────────────────────────────────────
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { Download, ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { personalInfo } from "../data/portfolioData";

// Staggered container variant for children animations
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "8rem 1.5rem 4rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%", textAlign: "center" }}>
        <motion.div variants={container} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Profile Photo */}
          <motion.div variants={item} style={{ marginBottom: "2rem" }}>
            <AvatarOrb name={personalInfo.name} />
          </motion.div>

          {/* Status badge */}
          <motion.div variants={item} style={{ marginBottom: "1.5rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.25rem 0.875rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 500,
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
              }} />
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} style={{
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "0.5rem",
            color: "var(--color-text)",
            letterSpacing: "-0.04em",
          }}>
            {personalInfo.name}
          </motion.h1>

          {/* Title */}
          <motion.div variants={item} style={{ marginBottom: "1.5rem" }}>
            <h2 style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 500,
              color: "var(--color-muted)",
              letterSpacing: "-0.02em",
            }}>
              {personalInfo.title}
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} style={{
            fontSize: "1.125rem",
            color: "var(--color-muted)",
            maxWidth: "600px",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}>
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
            <Link to="projects" smooth duration={600} offset={-64}>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.button>
            </Link>
            <div style={{ position: "relative" }}>
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                      position: "absolute",
                      top: "calc(100% + 0.5rem)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.5rem",
                      padding: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                      minWidth: "150px",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      zIndex: 50,
                    }}
                  >
                    <a
                      href={`mailto:${personalInfo.email}`}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.5rem 0.75rem", borderRadius: "0.25rem",
                        color: "var(--color-text)", textDecoration: "none",
                        fontSize: "0.875rem", fontWeight: 500,
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-accent)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <Mail size={16} /> Email
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.5rem 0.75rem", borderRadius: "0.25rem",
                        color: "var(--color-text)", textDecoration: "none",
                        fontSize: "0.875rem", fontWeight: 500,
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-accent)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <LinkedinIcon size={16} /> LinkedIn
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            {[
              { href: personalInfo.github,   Icon: GithubIcon,   label: "GitHub" },
              { href: personalInfo.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -4, color: "var(--color-primary)" }}
                style={{
                  color: "var(--color-muted)",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Profile photo — minimalist circular crop ── */
function AvatarOrb({ name }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        padding: "4px",
        background: "var(--color-border)",
      }}>
        <img
          src="/avatar.jpg"
          alt={`${name} — profile photo`}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            background: "var(--color-surface)",
          }}
        />
      </div>
    </div>
  );
}
