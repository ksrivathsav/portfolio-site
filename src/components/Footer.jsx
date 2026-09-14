import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Code2, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { Link } from "react-scroll";
import { personalInfo, navLinks } from "../data/portfolioData";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const year   = new Date().getFullYear();

  return (
    <footer style={{
      background: "var(--color-bg)",
      borderTop: "1px solid var(--color-border)",
      padding: "4rem 1.5rem 2.5rem",
    }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        {/* Top row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: "2.5rem",
          marginBottom: "3rem",
        }}>

          {/* Brand */}
          <motion.div variants={fadeUp} style={{ maxWidth: "260px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                style={{
                  width: "32px", height: "32px", borderRadius: "0.375rem",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Code2 size={16} color="#fff" />
              </motion.div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
                Srivathsav
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.7 }}>
              Software Engineer crafting scalable systems and elegant digital experiences.
            </p>
          </motion.div>

          {/* Quick Nav */}
          <motion.div variants={fadeUp}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Navigate
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  smooth
                  duration={600}
                  offset={-56}
                  style={{ fontSize: "0.875rem", color: "var(--color-muted)", cursor: "pointer", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => { e.target.style.color = "var(--color-text)"; }}
                  onMouseLeave={(e) => { e.target.style.color = "var(--color-muted)"; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {[
                { Icon: GithubIcon,   href: personalInfo.github,            label: "GitHub" },
                { Icon: LinkedinIcon, href: personalInfo.linkedin,          label: "LinkedIn" },
                { Icon: Mail,         href: `mailto:${personalInfo.email}`, label: "Email" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ x: 4, color: "var(--color-text)" }}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--color-muted)", textDecoration: "none" }}
                >
                  <Icon size={15} /> {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          style={{
            borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            © {year} {personalInfo.name}.
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
              Built with <Heart size={12} style={{ color: "#ec4899" }} fill="#ec4899" /> &amp; React
            </span>
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            {[
              { Icon: GithubIcon,   href: personalInfo.github },
              { Icon: LinkedinIcon, href: personalInfo.linkedin },
              { Icon: Mail,         href: `mailto:${personalInfo.email}` },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                style={{ color: "var(--color-muted)" }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
