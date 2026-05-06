import { getAllProjects } from "@/lib/projects";
import ProjectCarousel from "./components/ProjectCarousel";
import ScrollToHash from "./components/ScrollToHash";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <ScrollToHash />
      {/* Hero */}
      <section
        className="grid-bg"
        style={{
          padding: "100px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orbs */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          <p
            className="mono"
            style={{ color: "var(--accent-cyan)", marginBottom: "16px", letterSpacing: "0.2em", fontSize: "0.8rem" }}
          >
            AI FREELANCER
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "24px",
              background: "linear-gradient(135deg, #f0f0f0 0%, #888888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Abdulmohsen Alghamdi
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "560px", margin: "0 auto 16px" }}>
            I build end-to-end AI systems — self-directed projects spanning NLP, computer vision, LLMs, and more.
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", maxWidth: "560px", margin: "0 auto 40px", fontStyle: "italic" }}>
            This portfolio is built around self-directed AI projects — each one tackles a real-world problem end-to-end, from data to deployment.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                background: "var(--accent-cyan)",
                color: "#000",
                padding: "12px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              View Projects
            </a>
            <a
              href="/about"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                padding: "12px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              About Me
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px", display: "flex", justifyContent: "center", gap: "64px", flexWrap: "wrap" }}>
          {[
            { label: "Projects", value: projects.length.toString().padStart(2, "0") },
            { label: "Domains", value: [...new Set(projects.flatMap(p => p.domain))].length.toString().padStart(2, "0") },
            { label: "Status", value: "Active" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--accent-cyan)", fontFamily: "monospace" }}>
                {stat.value}
              </p>
              <p className="mono" style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects grid */}
      <section id="projects" style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ marginBottom: "48px" }}>
          <p className="mono" style={{ color: "var(--accent-cyan)", marginBottom: "8px", letterSpacing: "0.15em", fontSize: "0.8rem" }}>
            PORTFOLIO
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-secondary)" }}>
            <p className="mono" style={{ fontSize: "1rem" }}>No projects yet</p>
            <p style={{ marginTop: "8px", fontSize: "0.875rem" }}>First project coming soon.</p>
          </div>
        ) : (
          <ProjectCarousel projects={projects} />
        )}
      </section>
    </>
  );
}