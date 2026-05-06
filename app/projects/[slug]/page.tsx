import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const statusColor: Record<string, string> = {
  Completed: "#22c55e",
  "In Progress": "#f59e0b",
};

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
      {/* Back link */}
      <Link
        href="/#projects"
        className="mono"
        style={{
          color: "var(--text-secondary)",
          textDecoration: "none",
          fontSize: "0.8rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "40px",
          letterSpacing: "0.1em",
        }}
      >
        ← BACK TO PROJECTS
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
          <span className="mono" style={{ color: statusColor[project.status], fontSize: "0.7rem", padding: "3px 10px", border: `1px solid ${statusColor[project.status]}`, borderRadius: "999px" }}>
            {project.status}
          </span>
          {project.domain.map((d) => (
            <span key={d} className="mono" style={{ color: "var(--accent-cyan)", fontSize: "0.75rem" }}>
              ◆ {d}
            </span>
          ))}
          <span className="mono" style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>
            {new Date(project.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "12px" }}>
          {project.title}
        </h1>

        <p className="mono" style={{ color: "var(--accent-cyan)", marginBottom: "16px", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
          {project.industry.toUpperCase()}
        </p>

        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
          {project.summary}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="mono"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "4px 10px",
              color: "var(--accent-purple)",
              fontSize: "0.75rem",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: "0.875rem",
              transition: "border-color 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        )}
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid var(--accent-cyan)",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "var(--accent-cyan)",
              textDecoration: "none",
              fontSize: "0.875rem",
              transition: "opacity 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Live Demo
          </a>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)", marginBottom: "48px" }} />

      {/* Content */}
      <article style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", fontWeight: 700, margin: "36px 0 12px" }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 600, margin: "24px 0 8px" }}>
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p style={{ marginBottom: "16px", lineHeight: 1.8 }}>{children}</p>
            ),
            ul: ({ children }) => (
              <ul style={{ paddingLeft: "20px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li style={{ color: "var(--text-secondary)" }}>{children}</li>
            ),
            table: ({ children }) => (
              <div style={{ overflowX: "auto", marginBottom: "24px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th style={{ textAlign: "left", padding: "10px 16px", borderBottom: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                {children}
              </td>
            ),
            code: ({ children }) => (
              <code style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "2px 6px", fontFamily: "monospace", fontSize: "0.85rem", color: "var(--accent-cyan)" }}>
                {children}
              </code>
            ),
            strong: ({ children }) => (
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{children}</strong>
            ),
          }}
        >
          {project.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}