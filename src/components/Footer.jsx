// ─────────────────────────────────────────────────────────
//  Footer.jsx
//  Simple footer with copyright and social links.
// ─────────────────────────────────────────────────────────
import { motion } from "framer-motion";
import { Mail, Heart, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { Link } from "react-scroll";
import { personalInfo, navLinks } from "../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "var(--color-bg)",
      borderTop: "1px solid var(--color-border)",
      padding: "3rem 1.5rem 2rem",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Top row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: "2rem", height: "2rem",
                borderRadius: "0.25rem",
                background: "var(--color-primary)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Code2 size={16} color="var(--color-bg)" />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                Srivathsav
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", maxWidth: "240px", lineHeight: 1.65 }}>
              Full Stack Developer crafting elegant digital experiences.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Navigate
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  smooth
                  duration={600}
                  offset={-64}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-muted)",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.target.style.color = "var(--color-primary)"; }}
                  onMouseLeave={(e) => { e.target.style.color = "var(--color-muted)"; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { Icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
                { Icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
                { Icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    fontSize: "0.875rem", color: "var(--color-muted)",
                    textDecoration: "none", transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-muted)"; }}
                >
                  <Icon size={15} /> {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <p style={{
            fontSize: "0.8125rem", color: "var(--color-muted)",
            display: "flex", alignItems: "center", gap: "0.35rem",
          }}>
          </p>
        </div>
      </div>
    </footer>
  );
}
