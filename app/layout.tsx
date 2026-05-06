import type { Metadata } from "next";
import Link from "next/link";
import NavLinks from "./components/NavLinks";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdulmohsen Alghamdi — AI Freelancer",
  description:
    "End-to-end AI projects spanning NLP, computer vision, LLMs, generative AI, RAG pipelines, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav
          style={{
            borderBottom: "1px solid var(--border)",
            background: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "0 24px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                color: "var(--accent-cyan)",
                textDecoration: "none",
                fontFamily: "monospace",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              AA<span style={{ color: "var(--text-secondary)" }}>.ai</span>
            </Link>

            {/* Nav links */}
            <NavLinks />
          </div>
        </nav>

        <main>{children}</main>

        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "32px 24px",
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
          }}
        >
          <p style={{ marginBottom: "8px" }}>
            <span className="mono" style={{ color: "var(--accent-cyan)" }}>
              Abdulmohsen Alghamdi
            </span>
          </p>
          <p style={{ marginBottom: "8px", display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
            <span>mohsen.a.1424@gmail.com</span>
            <span>+966 501-700-700</span>
          </p>
          <p className="mono" style={{ fontSize: "0.75rem", color: "var(--border)" }}>
            Built with Next.js · {new Date().getFullYear()}
          </p>
        </footer>
      </body>
    </html>
  );
}