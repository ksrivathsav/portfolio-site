import { useState } from "react";

/**
 * @param {string} url       - Relative or absolute image URL
 * @param {string} company   - Company name (used for alt text + fallback initials)
 * @param {string} color     - Brand hex color (fallback background tint + initials color)
 */
export function CompanyLogo({ url, company, color }) {
  const [failed, setFailed] = useState(false);
  const base     = import.meta.env.BASE_URL;
  const src      = url ? (url.startsWith("http") ? url : `${base}${url}`) : null;
  const isPng    = src && src.endsWith(".png");
  // UF work-experience logo uses a dark-blue background
  const isDarkBg = src && src.includes("uf.png") && !src.includes("uf_seal");

  return (
    <div
      style={{
        height: "34px", minWidth: "34px", maxWidth: "108px",
        borderRadius: "8px", flexShrink: 0,
        background: failed || !src
          ? `${color}18`
          : isDarkBg ? "#0021A5"
          : isPng    ? "#ffffff"
          : "var(--color-bg)",
        border: `1.5px solid ${failed || !src ? color + "30" : "var(--color-border)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        padding: failed || !src ? 0 : "3px 6px",
        boxShadow: (isPng || isDarkBg) && !failed ? "0 1px 6px rgba(0,0,0,0.14)" : "none",
      }}
    >
      {!failed && src ? (
        <img
          src={src}
          alt={`${company} logo`}
          style={{ height: "26px", width: "auto", maxWidth: "96px", objectFit: "contain", display: "block" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{ fontSize: "0.62rem", fontWeight: 800, color, letterSpacing: "-0.02em", padding: "0 4px" }}>
          {company.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
